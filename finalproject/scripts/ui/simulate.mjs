export async function loadSimulationResults() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const targetScenario = urlParams.get("scenario");

        if (!targetScenario) {
            console.error("No scenario parameter detected in the URL path.");
            return;
        }

        const response = await fetch("./data/data.json");
        if (!response.ok) throw new Error("Database file request failed.");
        const data = await response.json();

        const activeScenario = data.scenarios[targetScenario];
        const globalHormones = data.hormones;

        if (!activeScenario) {
            console.error(`Scenario key "${targetScenario}" not found in database registry.`);
            return;
        }

        document.querySelector("#scenario-title").textContent = activeScenario.title;
        document.querySelector("#scenario-summary").textContent = activeScenario.summary;

        const template = document.querySelector("#hormone-card-template");
        const gridContainer = document.querySelector("#hormone-cards-grid");
        
        if (!gridContainer || !template) return;
        gridContainer.innerHTML = ""; 

        activeScenario.activeHormones.forEach((scenarioItem, index) => {
            const clone = template.content.cloneNode(true);
            const cardElement = clone.querySelector(".hormone-status-card");

            const masterCharacter = globalHormones[scenarioItem.id];

            if (!masterCharacter) {
                console.error(`Data Mapping Error: ID "${scenarioItem.id}" found in scenario does not exist in global hormones database.`);
                return;
            }

            cardElement.querySelector(".hormone-name").textContent = masterCharacter.title;
            cardElement.querySelector(".status-badge").textContent = scenarioItem.status;
            cardElement.querySelector(".scenario-description").textContent = scenarioItem.description;

            const avatarImg = cardElement.querySelector(".hormone-avatar");
            avatarImg.src = masterCharacter.image; 
            avatarImg.alt = masterCharacter.altText || `${masterCharacter.title} character illustration`;

            if (index === 0) {
                cardElement.setAttribute("data-layout", "featured");
            } else {
                cardElement.setAttribute("data-layout", "row");
            }

            gridContainer.appendChild(clone);
        });

    } catch (error) {
        console.error("Failed to parse and execute simulation results engine:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadSimulationResults);