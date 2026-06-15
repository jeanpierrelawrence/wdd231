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

    const saveButton = document.querySelector("#bookmark-btn");

    const newSaveBtn = saveButton.cloneNode(true);
    saveButton.parentNode.replaceChild(newSaveBtn, saveButton);

    newSaveBtn.addEventListener("click", () => {
        toggleSaveHormone(character.title, character.image, character.themeColors.main);
    });

    const history = JSON.parse(localStorage.getItem("labHistory")) || [];
    const isAlreadySaved = history.some(item => item.name === character.title);

    if (isAlreadySaved) {
        newSaveBtn.classList.add("active");
        newSaveBtn.setAttribute("aria-pressed", "true");
    } else {
        newSaveBtn.classList.remove("active");
        newSaveBtn.setAttribute("aria-pressed", "false");
    }

    newSaveBtn.addEventListener("click", () => {
        const isNowActive = newSaveBtn.classList.toggle("active");
        newSaveBtn.setAttribute("aria-pressed", isNowActive);
        
        toggleSaveHormone(character.title, character.image, character.themeColors.main, isNowActive);
    });

    nodes.close.forEach(line => {
        line.style.stroke = character.themeColors.darker;
    });

    nodes.bg.style.backgroundColor = character.themeColors.main;
    nodes.glitchPanel.style.backgroundColor = character.themeColors.darker;

    nodes.title.textContent = character.title;
    nodes.badge.style.backgroundColor = character.themeColors.darker;
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

function toggleSaveHormone(name, imageUrl, themeColor, shouldSave) {
    let history = JSON.parse(localStorage.getItem("labHistory")) || [];

    if (shouldSave) {
        const alreadySaved = history.some(item => item.name === name);
        if (!alreadySaved) {
            history.push({
                name: name,
                image: imageUrl,
                backgroundColor: themeColor
            });
            localStorage.setItem("labHistory", JSON.stringify(history));
            console.log(`${name} successfully bookmarked.`);
        }
    } else {

        history = history.filter(item => item.name !== name);
        localStorage.setItem("labHistory", JSON.stringify(history));
        console.log(`${name} removed from bookmarks.`);
    }
}