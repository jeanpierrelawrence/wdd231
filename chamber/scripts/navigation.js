const menuBtn = document.querySelector("#menu-button");
const navLinks = document.querySelectorAll('.primary-nav ul li a');

menuBtn.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");

    const isOpen = document.body.classList.contains('nav-open');
    menuBtn.setAttribute("aria-expanded", isOpen);
})

document.addEventListener("DOMContentLoaded", () => {
    
    navLinks.forEach(link => {

        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});