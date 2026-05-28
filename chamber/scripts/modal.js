const modalBtn = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.querySelectorAll(".close-modal-btn");

modalBtn.forEach((button) => {
    button.addEventListener("click", () => {
        document.body.classList.add("modal-open");
        const modalId = button.getAttribute("data-modal");
        const targetModal = document.getElementById(modalId);

        if (targetModal) {
            targetModal.showModal();
        }
    });
});

closeModalBtn.forEach((button) => {
    button.addEventListener("click", () => {
        document.body.classList.remove("modal-open");
        const parentModal = button.closest("dialog");

        if (parentModal) {
            parentModal.close();
        }
    })
})