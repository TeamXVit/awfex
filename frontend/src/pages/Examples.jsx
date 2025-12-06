import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Examples() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

                {/* Header Section */}
                <div className="text-center mb-16 animate-[fadeIn_0.5s_ease-out]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Blueprints
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Example <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Workflows</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Pre-built logic patterns to jumpstart your automation. Copy these JSON structures directly into the Designer to see how they work.
                    </p>
                </div>

                {/* Instructions Box */}
                <div className="max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-20 animate-[fadeIn_0.7s_ease-out]">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        How to use these examples
                    </h3>
                    <ol className="space-y-3 text-slate-400 text-sm md:text-base list-decimal list-inside marker:text-indigo-500">
                        <li><strong>Copy</strong> the JSON code block from an example below.</li>
                        <li>Go to the <Link to="/designer" className="text-indigo-400 hover:underline">Designer</Link> page.</li>
                        <li>Click the <strong>JSON</strong> tab in the sidebar.</li>
                        <li><strong>Paste</strong> the code and click <strong>Save</strong>.</li>
                        <li>The workflow will visualize automatically on the canvas!</li>
                    </ol>
                </div>

                {/* Examples Grid */}
                <div className="grid gap-12 lg:gap-20">

                    {/* Example 1: Text-to-SQL */}
                    <ExampleCard
                        title="Natural Language Database Querying"
                        description="Turn plain English questions into executing database queries using a multi-step AI pipeline."
                        mechanics={
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><strong>1. Gemini:</strong> Translates your natural language request (e.g., 'get users over 25') into a raw SQL query string.</li>
                                <li><strong>2. Regex:</strong> Extracts <em>only</em> the SQL code from Gemini's markdown response to ensure clean execution.</li>
                                <li><strong>3. SQLite:</strong> Takes the cleaned SQL string and executes it against the database, returning the actual results.</li>
                            </ul>
                        }
                        jsonCode={`{
  "sqlite": [
    {
      "regex": [
        {
          "gemini": [
            "$env:GEMINI_API_KEY",
            "gemini-2.5-flash",
            {
              "add": [
                "your a sqlite agent, you only output dqlite query.",
                "gel all the users from users table whose age is above 25."
              ]
            }
          ]
        },
        "\`\`\`sqlite\\\\s*([\\\\s\\\\S]*?)\`\`\`"
      ]
    }
  ]
}`}
                    />

                    {/* Example 2: Data Analysis */}
                    <ExampleCard
                        title="Automated Data Analysis"
                        description="Fetch raw data from your database and have an AI agent perform insightful analysis on it automatically."
                        mechanics={
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><strong>1. SQLite:</strong> Fetches raw rows from the database (e.g., all users).</li>
                                <li><strong>2. JSON Stringify:</strong> Converts the database array result into a string format that the AI can read.</li>
                                <li><strong>3. Add:</strong> Combines the data string with an analysis prompt (e.g., 'Analyze this data...').</li>
                                <li><strong>4. Gemini:</strong> Receives the combined context and outputs a text summary or insight about the data.</li>
                            </ul>
                        }
                        jsonCode={`{
  "gemini": [
    "$env:GEMINI_API_KEY",
    "gemini-2.5-flash",
    {
      "add": [
        {
          "jsonStringify": [
            {
              "sqlite": [
                "SELECT * FROM users;\\n"
              ]
            }
          ]
        },
        "your a data analysis agent, analysis the provided data."
      ]
    }
  ]
}`}
                    />
                    <ExampleCard
                        title="Todo Reminder Assistant"
                        description="Fetches your TODO item from an API and turns it into a natural reminder."
                        mechanics={
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><strong>1. httpRequest:</strong> Fetches a TODO item from a REST API using the ID you provide.</li>
                                <li><strong>2. jsonStringify:</strong> Converts the HTTP response into a JSON string so Gemini can read it cleanly.</li>
                                <li><strong>3. Gemini:</strong> Takes the API response and turns it into a friendly reminder message.</li>
                            </ul>
                        }
                        jsonCode={`{
  "gemini": [
    "$env:GEMINI_API_KEY",
    "gemini-2.5-flash",
    {
      "add": [
        {
          "jsonStringify": [
            {
              "httpRequest": [
                {
                  "add": [
                    "https://jsonplaceholder.typicode.com/todos/",
                    "$query:x"
                  ]
                },
                "GET"
              ]
            }
          ]
        },
        "This is the response from my TODO API. Convert it into a reminder about what I need to do."
      ]
    }
  ]
}`}
                    />

                </div>
            </div>
        </div>
    );
}

function ExampleCard({ title, description, mechanics, jsonCode }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Description Side */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">How it works</h4>
                    {mechanics}
                </div>
            </div>

            {/* Code Side */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
                <div className="relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">

                    {/* Toolbar */}
                    <div className="flex justify-between items-center px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                        <div className="text-xs font-mono text-slate-500">workflow.json</div>
                        <button
                            onClick={handleCopy}
                            className="text-xs flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-green-400">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    <span>Copy JSON</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="p-4 overflow-x-auto">
                        <pre className="text-sm font-mono leading-relaxed text-indigo-100">
                            <code>{jsonCode}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
