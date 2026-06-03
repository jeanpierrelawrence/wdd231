document.addEventListener("DOMContentLoaded", () => {

    const lastVisit = localStorage.getItem("last-visit-timestamp");
    const currentTimestamp = Date.now();
    
    let displayMessage = "";

    if (!lastVisit) {
        displayMessage = "Welcome! Let us know if you have any questions.";
    } else {
        const msBetween = currentTimestamp - parseInt(lastVisit, 10);
        const daysBetween = Math.floor(msBetween / (1000 * 60 * 60 * 24));

        if (msBetween < 1000 * 60 * 60 * 24) {
            displayMessage = "Back so soon! Awesome!";
        } else {
            const dayText = daysBetween === 1 ? "day" : "days";
            displayMessage = `You last visited ${daysBetween} ${dayText} ago.`;
        }
    }

    localStorage.setItem("last-visit-timestamp", currentTimestamp);

    showToastNotification(displayMessage);
});

function showToastNotification(message) {

    const toast = document.createElement("aside");
    toast.className = "visit-toast";
    toast.classList.add("heading-sm");
    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("is-visible");
    });

    setTimeout(() => {
        toast.classList.remove("is-visible");
        
        toast.addEventListener("transitionend", () => {
            toast.remove();
        });
    }, 3000);
}