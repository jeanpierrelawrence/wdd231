const nodes = {
    title: document.getElementById("modal-title"),
    badge: document.querySelector(".profile-header .badge"),
    born: document.getElementById("born"),
    travel: document.getElementById("travel"),
    wakeup: document.getElementById("wakeup"),
    job: document.getElementById("job"),
    low: document.getElementById("low"),
    high: document.getElementById("high"),
    bg: document.getElementById("modal-content"),
    glitchPanel: document.querySelector(".glitch-panel"),
    image: document.querySelector("#modal-img"),
    close: document.querySelectorAll(".close-line")
};

export function displayModalInfo(character) {

    if (!character || !character.themeColors || !character.stats || !character.glitches) {
        console.error("Invalid character data payload provided to displayModalInfo.");
        return;
    }

    nodes.close.forEach(line => {
        line.style.stroke = character.themeColors.darker;
    });

    nodes.bg.style.backgroundColor = character.themeColors.main;
    nodes.glitchPanel.style.backgroundColor = character.themeColors.darker;

    nodes.title.textContent = character.title;
    nodes.badge.textContent = character.badge;

    nodes.born.textContent = character.stats.born;
    nodes.travel.textContent = character.stats.travel;
    nodes.wakeup.textContent = character.stats.wakeup;

    nodes.job.textContent = character.job;
    nodes.low.textContent = character.glitches.low;
    nodes.high.textContent = character.glitches.high;

    nodes.image.src = character.image;
    nodes.image.alt = character.altText;
}