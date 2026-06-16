document.addEventListener("DOMContentLoaded", () => {
    loadLabHistory();
    initClearHistoryButton();
});

function loadLabHistory() {
    const historyContainer = document.querySelector("#lab-history-grid");
    if (!historyContainer) return;

    const history = JSON.parse(localStorage.getItem("labHistory")) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = `<p class="empty-state text-light">No bookmarked hormones found in your lab records yet.</p>`;
        return;
    }

    historyContainer.innerHTML = "";

    history.forEach(item => {
        const card = document.createElement("figure");
        card.className = "saved-hormone-card";
        
        card.innerHTML = `
            <img src="${item.image}" alt="Plush 3D ${item.name} character" style="background-color: ${item.backgroundColor}" width=300>
            <figcaption class="mono">${item.name}</figcaption>
        `;
        
        historyContainer.appendChild(card);
    });
}

function initClearHistoryButton() {
    const clearBtn = document.getElementById("clear-history");
    
    if (!clearBtn) return; 

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("labHistory"); 
        loadLabHistory();
    });
}