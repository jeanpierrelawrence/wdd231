const modalBtn = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.querySelectorAll(".close-modal-btn");

modalBtn.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const targetModal = document.getElementById(modalId);

        if (targetModal) {
            targetModal.showModal();
        }
    });
});

closeModalBtn.forEach((button) => {
    button.addEventListener("click", () => {
        const parentModal = button.closest("dialog");

        if (parentModal) {
            parentModal.close();
        }
    })
})