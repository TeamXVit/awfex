import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

export default function Docs() {
    const [baseUrl, setBaseUrl] = useState("");
    useEffect(() => {
        setBaseUrl(getCookie("apiUrl") || "http://localhost:5000");
    }, []);
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
            <Navbar />

            {/* Main Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Section: Workflow Tester + Core Concepts */}
                <section className="flex flex-col gap-6">
                    {/* Core Concepts */}
                    <div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Core Concepts
                            </h2>
                            <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8">
                                Understanding how AWFEX translates your visual design into
                                execution.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 md:gap-10">
                            {/* The Canvas & Nodes */}
                            <div className="w-full md:w-auto p-6 rounded-xl bg-slate-900/40 border border-slate-800/60 transition-all hover:bg-slate-900/60">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-indigo-900/40 rounded-lg text-indigo-400">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white">
                                        The Canvas & Nodes
                                    </h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                                    The canvas is your workspace. Each <strong>Node</strong>{" "}
                                    represents a distinct function that accepts inputs and
                                    produces an output.
                                </p>
                                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                                    <li className="flex gap-2">
                                        <span className="text-indigo-500">•</span>
                                        <span>
                                            <strong>Connectors:</strong> Draw lines between nodes to
                                            pipe the output of one function into the input of
                                            another.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-indigo-500">•</span>
                                        <span>
                                            <strong>Tooltips:</strong> Hover over any Node(function) to read exactly what it does and the arguments it expects.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* JSON & Execution */}
                            <div className="w-full md:w-auto p-6 rounded-xl bg-slate-900/40 border border-slate-800/60 transition-all hover:bg-slate-900/60">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-900/40 rounded-lg text-purple-400">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white">
                                        JSON Generation
                                    </h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                                    Your visual design is compiled into a recursive JSON
                                    structure. This lightweight JSON tells the engine exactly
                                    which functions to run and in what order.
                                </p>
                                <div className="bg-slate-950 p-3 rounded font-mono text-[11px] sm:text-xs text-slate-500 overflow-x-auto border border-slate-800">
                                    <span className="text-purple-400">{"{"}</span>
                                    <br />
                                    &nbsp;&nbsp;
                                    <span className="text-blue-400">"func1"</span>:{" "}
                                    <span className="text-yellow-400">[</span>
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-purple-400">{"{"}</span>
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-blue-400">"func2"</span>:{" "}
                                    <span className="text-yellow-400">["arg1", "arg2"]</span>
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-purple-400">{"}"}</span>,
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-yellow-400">"arg3"</span>
                                    <br />
                                    &nbsp;&nbsp;
                                    <span className="text-yellow-400">]</span>
                                    <br />
                                    <span className="text-purple-400">{"}"}</span>
                                </div>

                            </div>
                        </div>

                        {/* Special Variables */}
                        <div className="mt-10 sm:mt-12">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-5 sm:mb-6">
                                Special Variables
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FeatureBox
                                    title="$env Variables"
                                    icon={
                                        <svg
                                            className="w-5 h-5 text-emerald-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    }
                                    content={
                                        <span>
                                            Access server-side secrets safely. Use{" "}
                                            <code className="bg-slate-800 px-1 py-0.5 rounded text-emerald-300 text-xs">
                                                $env:KEY_NAME
                                            </code>{" "}
                                            in any input field to inject Environment Variables at
                                            runtime.
                                        </span>
                                    }
                                />
                                <FeatureBox
                                    title="$query Params"
                                    icon={
                                        <svg
                                            className="w-5 h-5 text-blue-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    }
                                    content={
                                        <span>
                                            Make workflows dynamic. Pass URL params (e.g.,{" "}
                                            <code className="bg-slate-800 px-1 py-0.5 rounded text-blue-300 text-xs">
                                                ?userId=123
                                            </code>
                                            ) and access them via{" "}
                                            <code className="bg-slate-800 px-1 py-0.5 rounded text-blue-300 text-xs">
                                                $query:userId
                                            </code>
                                            .
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Section: API Docs */}
                <section className="flex flex-col gap-6 sm:gap-8 mt-8 lg:mt-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            API Documentation
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Complete reference for the AWFEX API endpoints.
                        </p>
                    </div>

                    {/* Auth + Rate Limits */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <h3 className="text-lg font-bold text-white mb-2">
                            Authentication & Rate Limits
                        </h3>

                        <p className="text-sm text-slate-400 mb-3">
                            AWFEX uses API Key authentication. Include it in:
                        </p>

                        <pre className="text-xs font-mono bg-slate-950 p-3 rounded border border-slate-800 text-blue-400 overflow-x-auto">
                            x-api-key: YOUR_API_KEY
                        </pre>

                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <p className="text-sm text-slate-400 mb-2">
                                Current Base URL:
                            </p>
                            <div className="bg-slate-950 p-3 rounded border border-slate-800 overflow-x-auto">
                                <code className="text-sm font-mono text-blue-400">
                                    {baseUrl || "http://localhost:5000"}
                                </code>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Configure this in Designer Settings
                            </p>
                        </div>
                    </div>

                    {/* GET /workflow */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                GET
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                AUTH REQUIRED
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /workflow
                            </code>
                        </div>
                        <p className="text-sm text-slate-400">
                            Returns a list of all saved workflow names.
                        </p>
                    </div>

                    {/* POST /workflow */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                                POST
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                AUTH REQUIRED
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /workflow
                            </code>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                            Save or update a workflow.
                        </p>
                        <div className="bg-slate-900 rounded-lg border border-slate-800 p-3 overflow-x-auto">
                            <pre className="text-xs font-mono text-slate-300">{`{
  "name": "mathFlow",
  "workflow": { "mul": [{ "add": [2, 3] }, 4] }
}`}</pre>
                        </div>
                    </div>

                    {/* GET /workflow/:name */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                GET
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                AUTH REQUIRED
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /workflow/:name
                            </code>
                        </div>
                        <p className="text-sm text-slate-400">Retrieve a workflow.</p>
                    </div>

                    {/* DELETE /workflow/:name */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                DELETE
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                AUTH REQUIRED
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /workflow/:name
                            </code>
                        </div>
                        <p className="text-sm text-slate-400">Delete a workflow.</p>
                    </div>

                    {/* GET /run/:name */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                GET
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                AUTH REQUIRED
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /run/:name
                            </code>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                            Run a workflow by name.
                        </p>
                        <div className="bg-slate-900 rounded-lg border border-slate-800 p-3 overflow-x-auto">
                            <pre className="text-xs font-mono text-slate-300">{`GET /run/mathFlow?x=10
Headers:
x-api-key: YOUR_API_KEY`}</pre>
                        </div>
                    </div>

                    {/* POST /run */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                POST
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                AUTH REQUIRED
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /run
                            </code>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                            Execute an inline workflow with optional query params.
                        </p>
                        <div className="bg-slate-900 rounded-lg border border-slate-800 p-3 overflow-x-auto">
                            <pre className="text-xs font-mono text-slate-300">{`POST /run?x=5
Headers:
x-api-key: YOUR_API_KEY
{
  "add": ["$query:x", 3]
}`}</pre>
                        </div>
                    </div>

                    {/* GET /functions */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                GET
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /functions
                            </code>
                        </div>
                        <p className="text-sm text-slate-400">List available functions.</p>
                    </div>

                    {/* GET /descriptions */}
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                GET
                            </span>
                            <code className="text-sm font-mono text-slate-200">
                                /descriptions
                            </code>
                        </div>
                        <p className="text-sm text-slate-400">
                            List available functions and their descriptions as key value pairs.
                        </p>
                    </div>
                </section>
            </main>
        </div >
    );
}

function FeatureBox({ title, icon, content }) {
    return (
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">{content}</p>
        </div>
    );
}
