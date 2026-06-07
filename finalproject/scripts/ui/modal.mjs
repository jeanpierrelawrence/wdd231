import { displayModalInfo } from "./displayModalInfo.mjs";

const dialog = document.querySelector("dialog");
const pillPopups = document.querySelectorAll(".pill-popup");
const closeModalBtn = document.querySelector(".modal-close");

export function initHormoneModals(hormones) {
    pillPopups.forEach(pill => {
        pill.addEventListener("click", () => {

            const hormoneKey = pill.dataset.hormone;
            const selectedHormone = hormones[hormoneKey];

            if (selectedHormone) {
                displayModalInfo(selectedHormone);
                dialog.showModal();
            } else {
                console.warn(`Hormone data reference not found for key: "${hormoneKey}"`);
            }
        })
    });

    closeModalBtn.addEventListener("click", () => {
        dialog.close();
    })
}


