const mainNav = document.getElementById("nav")
const menuBtn = document.getElementById("menu-button")
const navLinks = document.querySelectorAll('#nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        navLinks.forEach(l => l.classList.remove('current'));

        this.classList.add('current');
    });
});

menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active")
    menuBtn.classList.toggle("active")

    const icon = menuBtn.querySelector('.fa-solid');
    if (menuBtn.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
})