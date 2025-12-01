const BASE_URL = "http://localhost:5000";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const getAuthHeaders = () => {
    const apiKey = getCookie("apiKey");
    return apiKey ? { "x-api-key": apiKey } : {};
};

export const api = {
    fetchFunctions: async () => {
        const res = await fetch(`${BASE_URL}/functions`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },

    fetchDescriptions: async () => {
        const res = await fetch(`${BASE_URL}/descriptions`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },

    fetchWorkflows: async () => {
        const res = await fetch(`${BASE_URL}/workflow`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch workflows");
        return res.json();
    },

    fetchWorkflowDetails: async (name) => {
        const res = await fetch(`${BASE_URL}/workflow/${name}`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error(`Failed to fetch ${name}`);
        return res.json();
    },

    saveWorkflow: async (name, workflow) => {
        const res = await fetch(`${BASE_URL}/workflow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders()
            },
            body: JSON.stringify({ name, workflow }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to save workflow");
        }
        return res.json();
    },

    deleteWorkflow: async (name) => {
        const res = await fetch(`${BASE_URL}/workflow/${name}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to delete workflow");
        }
        return res.json();
    },

    runWorkflow: async (workflow, query = "") => {
        const res = await fetch(`${BASE_URL}/run${query}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders()
            },
            body: JSON.stringify(workflow),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },
};
