const year = document.getElementById("currentyear");

const today = new Date();
year.textContent = today.getFullYear()

document.getElementById("lastModified").textContent = document.lastModified;