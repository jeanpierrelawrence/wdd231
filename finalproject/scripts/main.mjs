import { initHormoneModals } from "./ui/modal.mjs";
import "./ui/labHistory.mjs";

async function initApp() {
    try {
        const response = await fetch("./data/data.json");
        const data = await response.json();

        if (data.hormones) {
            initHormoneModals(data.hormones)
        } else {
            console.error("Hormones dictionary missing from JSON data structure.");
        }
    } catch (error) {
        console.error("Failed to load application configuration data:", error);
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("scenario")) {
        const { loadSimulationResults } = await import("./ui/simulate.mjs");
        loadSimulationResults();
    }
}

document.addEventListener("DOMContentLoaded", initApp);