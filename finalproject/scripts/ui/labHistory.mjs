document.addEventListener("DOMContentLoaded", () => {
    loadLabHistory();
});

function loadLabHistory() {
    const historyContainer = document.querySelector("#lab-history-grid");
    if (!historyContainer) return;

    const history = JSON.parse(localStorage.getItem("labHistory")) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = `<p class="empty-state">No bookmarked hormones found in your lab records yet.</p>`;
        return;
    }

    historyContainer.innerHTML = "";

    history.forEach(item => {
        const card = document.createElement("figure");
        card.style.backgroundColor = item.backgroundColor;
        card.className = "saved-hormone-card";
        
        card.innerHTML = `
            <img src="${item.image}" alt="Plush 3D ${item.name} character" width=300>
            <figcaption>${item.name}</figcaption>
        `;
        
        historyContainer.appendChild(card);
    });
}