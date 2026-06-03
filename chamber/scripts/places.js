import { places } from "../data/places.mjs";

document.addEventListener("DOMContentLoaded", () => {
    displayPlaces(places)
})

function displayPlaces(data) {

    const container = document.querySelector("#places");
    if (!container) return;

    data.forEach(item => {
        
        const card = document.createElement("article");
        card.classList.add("card");

        const image = document.createElement("img");
        image.setAttribute("src", `${item.image_url}`);
        image.setAttribute("alt", `${item.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "200");

        const title = document.createElement("h2");
        title.textContent = item.name;

        const address = document.createElement("p");
        address.classList.add("address-label");
        address.textContent = item.address;

        const description = document.createElement("p");
        description.classList.add("place-description");
        description.textContent = item.description;

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(address);

        container.appendChild(card);

    });

}