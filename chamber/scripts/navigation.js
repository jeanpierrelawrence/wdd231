const menuBtn = document.querySelector("#menu-button");
const navLinks = document.querySelectorAll('.primary-nav ul li a');

menuBtn.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");

    const isOpen = document.body.classList.contains('nav-open');
    menuBtn.setAttribute("aria-expanded", isOpen);
})

navLinks.forEach(link => {
    link.addEventListener("click", function() {

        navLinks.forEach(l => l.classList.remove("active"));

        this.classList.add("active");

        document.body.classList.remove("nav-open");
    });
});