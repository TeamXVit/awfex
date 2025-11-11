import { useEffect, useState, useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

// ----------------- Custom Nodes -----------------
function FunctionNode({ id, data }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    data.onDelete(id);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        width: "120px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          border: "none",
          background: "#ff4d4d",
          color: "white",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        ×
      </button>

      <Handle type="target" position={Position.Top} />
      <div style={{ fontWeight: 600 }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function InputNode({ id, data }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    data.onDelete(id);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    data.onValueChange(id, e.target.value);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#e6f4ff",
        border: "1px solid #99ccff",
        borderRadius: "8px",
        padding: "8px",
        width: "160px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          border: "none",
          background: "#ff4d4d",
          color: "white",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        ×
      </button>

      <Handle type="target" position={Position.Top} />
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Input</div>
      <input
        type="text"
        value={data.value ?? ""}
        onChange={handleChange}
        placeholder='e.g. 42 or "hello"'
        style={{
          width: "100%",
          border: "1px solid #cddff7",
          borderRadius: 4,
          padding: "4px 6px",
          fontSize: 12,
          boxSizing: "border-box",
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// ----------------- App -----------------
export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [selectedFunc, setSelectedFunc] = useState("");

  // memoized node types to avoid re-creation warnings
  const nodeTypes = useMemo(
    () => ({
      custom: FunctionNode,
      inputNode: InputNode,
    }),
    []
  );

  // fetch functions from backend
  useEffect(() => {
    fetch("http://localhost:5000/functions")
      .then((res) => res.json())
      .then((data) => setFunctions(data))
      .catch(console.error);
  }, []);

  // delete node + connected edges
  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
  }, []);

  // update input node value (keeps value inside node.data)
  const handleInputValueChange = useCallback((id, value) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, value } } : n)));
  }, []);

  // ReactFlow handlers
  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // add function node
  const addFunctionNode = () => {
    if (!selectedFunc) return;
    const id = `${selectedFunc}-${nodes.length + 1}`;
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "custom",
        position: { x: Math.random() * 600, y: Math.random() * 400 },
        data: { label: selectedFunc, onDelete: deleteNode },
      },
    ]);
  };

  // add input node
  const addInputNode = () => {
    const id = `input-${nodes.length + 1}`;
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "inputNode",
        position: { x: Math.random() * 600, y: Math.random() * 400 },
        data: {
          value: "",
          onDelete: deleteNode,
          onValueChange: handleInputValueChange,
        },
      },
    ]);
  };

  // Build nested workflow JSON from graph
  const buildWorkflowJSON = useCallback(() => {
    // helper: find nodes that feed into target
    const findSourcesTo = (targetId) => edges.filter((e) => e.target === targetId).map((e) => e.source);

    const resolveNode = (nodeId, visited = new Set()) => {
      // protect against circular graphs
      if (visited.has(nodeId)) throw new Error("Cycle detected in graph");
      visited.add(nodeId);

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return null;

      if (node.type === "inputNode") {
        const raw = node.data?.value ?? "";
        if (raw === "") return ""; // empty stays empty string
        // If numeric (integer or float) convert, otherwise return string
        const num = Number(raw);
        // treat numeric if converting back to string equals trimmed input or if input is numeric-like
        if (!Number.isNaN(num) && String(num) === raw.trim()) return num;
        return raw;
      }

      // function node: collect incoming args
      const sources = findSourcesTo(nodeId);
      const args = sources.map((s) => resolveNode(s, new Set(visited)));
      return { [node.data?.label ?? "fn"]: args };
    };

    // choose final node: node that has no outgoing edges (i.e., not a source)
    const candidates = nodes.filter((n) => !edges.some((e) => e.source === n.id));
    if (candidates.length === 0) return null;
    // if multiple final nodes, return array of each (common-sense)
    if (candidates.length === 1) {
      try {
        return resolveNode(candidates[0].id);
      } catch (err) {
        return { error: err.message };
      }
    } else {
      try {
        return candidates.map((c) => resolveNode(c.id));
      } catch (err) {
        return { error: err.message };
      }
    }
  }, [nodes, edges]);

  // workflow JSON memoized so left panel updates live
  const workflowJSON = useMemo(() => buildWorkflowJSON(), [buildWorkflowJSON]);

  // copy to clipboard
  const copyToClipboard = async () => {
    try {
      const text = JSON.stringify(workflowJSON, null, 2);
      await navigator.clipboard.writeText(text);
      alert("Copied JSON to clipboard");
    } catch (err) {
      alert("Copy failed: " + err.message);
    }
  };

  // run workflow on backend
  const runWorkflow = async () => {
    const payload = workflowJSON;
    if (!payload) return alert("No workflow JSON to run. Build and connect nodes first.");
    try {
      const res = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(JSON.stringify(data, null, 2));
    } catch (err) {
      alert("Run failed: " + err.message);
    }
  };

  // small helper to pretty-print or show a message
  const prettyJSON = useMemo(() => {
    if (!workflowJSON) return "// Connect nodes to generate JSON";
    try {
      return JSON.stringify(workflowJSON, null, 2);
    } catch {
      return "// Error serializing JSON";
    }
  }, [workflowJSON]);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", gap: 8 }}>
      {/* Left Panel: JSON */}
      <div
        style={{
          width: 360,
          minWidth: 260,
          padding: 12,
          background: "#0f172a",
          color: "#e6eef8",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Generated JSON</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={copyToClipboard} style={{ padding: "6px 10px", cursor: "pointer" }}>
              Copy
            </button>
            <button onClick={runWorkflow} style={{ padding: "6px 10px", cursor: "pointer" }}>
              Run
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            background: "#071026",
            borderRadius: 6,
            padding: 10,
            fontFamily: "monospace",
            fontSize: 12,
            lineHeight: 1.4,
            whiteSpace: "pre",
            color: "#dbeafe",
          }}
        >
          {prettyJSON}
        </div>

        <div style={{ fontSize: 12, opacity: 0.85 }}>
          Tip: create an <strong>Input</strong> node and type numbers or text. Numbers like <code>42</code> become numbers in JSON; anything else stays a string.
        </div>
      </div>

      {/* Canvas and Toolbar */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top toolbar */}
        <div style={{ padding: 10, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
          <select onChange={(e) => setSelectedFunc(e.target.value)} value={selectedFunc}>
            <option value="">Select function</option>
            {functions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
          <button onClick={addFunctionNode}>➕ Add Function</button>
          <button onClick={addInputNode}>🔢 Add Input</button>
        </div>

        {/* React Flow Area */}
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
