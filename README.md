# AWFEX – Automation Workflow Engine Experiment

AWFEX is an open‑source, lightweight automation workflow engine designed as an alternative to tools like **n8n**. It focuses on simplicity, flexibility, and complete extensibility, allowing developers to create automation pipelines using custom functions and an intuitive UI.

## 🚀 Why AWFEX?

Modern automation tools are powerful but often heavy, complex, or locked behind proprietary ecosystems. AWFEX takes a different approach:

* **Fully open-source** – Anyone can contribute, extend, or modify the system.
* **Function‑first design** – You can add any new function to the project, and AWFEX can orchestrate it inside a workflow.
* **No vendor lock‑in** – Built using **Express.js** and **HTTP-based triggers**, AWFEX is easy to deploy anywhere.
* **Serverless‑friendly** – Because triggers are HTTP-only, the entire automation engine can run on serverless platforms.
* **UI driven** – Build workflows visually using a drag‑and‑drop interface powered by React Flow.
* **Backend without coding** – AWFEX can serve as a simple UI-based backend where you define logic through blocks instead of writing API routes.

## 🧩 What AWFEX Does

AWFEX orchestrates a sequence of functions—called **nodes**—and executes them based on the connections defined in a workflow.

You can:

* Create pipelines that automate data flow between functions.
* Trigger automations via simple HTTP requests.
* Build workflows visually in the frontend.
* Extend the engine with your own custom logic.
* Deploy the entire system as a lightweight backend.

Because AWFEX merely orchestrates and connects functions, **anything is possible** as long as the needed logic exists in the function library.

## 🏗️ Architecture Overview

The project consists of two main parts:

### **1. Backend (Express.js)**

* Handles workflow execution.
* Exposes endpoints to run workflows.
* Manages custom functions and node logic.
* Enables HTTP-triggered automations.

### **2. Frontend (React + React Flow)**

* Drag‑and‑drop UI to visually create automation workflows.
* Nodes, edges, and parameters can be edited transparently.
* Generates workflow JSON that can be sent to the backend.

## 🛠️ Features

* 🔌 Add unlimited custom functions
* 📡 HTTP-based triggers
* 🎛️ Visual workflow builder
* ⚡ Serverless-ready architecture
* 🌐 Works as a backend automation engine
* 🧱 Easy to extend and debug
* 🗂️ Clean JSON-based workflow format

## ⚠️ Limitations

* Currently supports **only HTTP triggers** (no cron, webhooks, queues, or event-based triggers yet).
* No built-in authentication layer (intended for controlled/internal environments).

## 📦 Installation and Usage

```bash
npm install
npm run dev
cd frontend
npm install
npm run dev
```

* Backend runs at: **[http://localhost:5000](http://localhost:5000)**
* Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

## ▶️ Usage

1. Start the backend.
2. Open the frontend to design a workflow.
3. Save the workflow JSON.
4. Trigger the workflow via HTTP.

## 👨‍💻 Contributing

You can contribute by:

* Adding new function modules
* Improving the UI
* Extending triggers
* Enhancing workflow validation/execution

All contributions are welcome.

## 📄 License

This project is open-source and available under the MIT License.

---

AWFEX is built with the idea that **automation should be simple, hackable, and limitless**. If you need a lightweight alternative to n8n—or want a backend where logic is defined visually—AWFEX gives you the freedom to build anything.
