import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Examples() {
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    fetch('/examples.json')
      .then(res => res.json())
      .then(data => setExamples(data))
      .catch(err => console.error('Failed to load examples:', err));
  }, []);

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
          {examples.map((example, index) => (
            <ExampleCard
              key={index}
              title={example.title}
              description={example.description}
              mechanics={example.mechanics}
              jsonCode={JSON.stringify(example.jsonCode, null, 2)}
            />
          ))}
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
          <ul className="space-y-2 text-sm text-slate-400">
            {mechanics.map((m, i) => (
              <li key={i}>
                <strong>{m.step}:</strong> <span className="inline-block"><ReactMarkdown components={{ p: 'span' }}>{m.description}</ReactMarkdown></span>
              </li>
            ))}
          </ul>
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
              className="text-xs flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
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
