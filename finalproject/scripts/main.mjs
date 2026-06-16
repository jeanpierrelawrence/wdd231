import { initHormoneModals } from "./ui/modal.mjs";
import "./ui/labHistory.mjs";
import { initNavbarEngine } from "./ui/navigation.mjs";

async function initApp() {

    initNavbarEngine();

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

    if (document.querySelector("#interactiveBody") || document.querySelector(".pill-overlay")) {

        const { initBodyScrollEngine } = await import("./animation/body-animation.mjs");
        initBodyScrollEngine();
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("scenario")) {
        const { loadSimulationResults } = await import("./ui/simulate.mjs");
        loadSimulationResults();
    }

    const year = document.getElementById("currentyear");

    const today = new Date();
    year.textContent = today.getFullYear()

    document.getElementById("lastModified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", initApp);