const menuBtn = document.querySelector("#menu-button");

menuBtn.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");

    const isOpen = document.body.classList.contains('nav-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
})