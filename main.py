import json
import re

# --- Define functions ---
def add(a, b):
    return a + b

def sub(a, b):
    return a - b

FUNCTIONS = {
    "add": add,
    "sub": sub
}

# --- Workflow runner ---
def run_workflow(workflow_json):
    data_store = {}
    for node in workflow_json["nodes"]:
        func = FUNCTIONS[node["function"]]

        # Resolve dynamic inputs
        inputs = {}
        for key, val in node["inputs"].items():
            if isinstance(val, str) and re.match(r"{{(.*?)}}", val):
                var_name = re.findall(r"{{(.*?)}}", val)[0]
                inputs[key] = data_store[var_name]
            else:
                inputs[key] = val

        # Execute node
        result = func(**inputs)

        # Store outputs
        for out_key, out_var in node["outputs"].items():
            data_store[out_var] = result

    # Resolve final output
    final_var = re.findall(r"{{(.*?)}}", workflow_json["output"])[0]
    return data_store[final_var]


# --- Example usage ---
if __name__ == "__main__":
    workflow = {
        "workflow_name": "MathFlow",
        "nodes": [
            {
                "id": "1",
                "name": "Add",
                "type": "function",
                "function": "add",
                "inputs": {"a": 2, "b": 3},
                "outputs": {"result": "add_result"}
            },
            {
                "id": "2",
                "name": "Subtract",
                "type": "function",
                "function": "sub",
                "inputs": {"a": "{{add_result}}", "b": 4},
                "outputs": {"result": "final_result"}
            }
        ],
        "output": "{{final_result}}"
    }

    print("Workflow result:", run_workflow(workflow))
