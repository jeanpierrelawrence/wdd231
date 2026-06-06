const dialog = document.querySelector("dialog");
const pillPopups = document.querySelectorAll(".pill-popup");
const closeModalBtn = document.querySelector(".modal-close");

pillPopups.forEach(pill => {
    pill.addEventListener("click", () => {
        dialog.showModal();
    })
});

closeModalBtn.addEventListener("click", () => {
    dialog.close();
})
