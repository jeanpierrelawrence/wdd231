const filePath = "data/members.json";
const businessContainer = document.querySelector("#business-container");
const toggleBtn = document.querySelector("#grid-toggle");
const display = document.querySelector("#business-container");

async function FetchMembers() {

    const response = await fetch(filePath);
    const data = await response.json();

    DisplayCards(data.members)
}

function DisplayCards(data) {

    data.forEach(item => {
        
        const card = document.createElement("article");
        const image = document.createElement("img");
        const title = document.createElement("h3");
        const addressContainer = document.createElement("address");
        const websiteLink = document.createElement("a");
        const address = document.createElement("p");
        const phoneNumber = document.createElement("p");
        const titleWrapper = document.createElement("div")

        image.setAttribute("src", `images/${item.image}`);
        image.setAttribute("alt", `${item.name}`)
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "100");

        title.textContent = `${item.name}`;
        title.classList.add("heading-md")
        address.textContent = `${item.address}`
        phoneNumber.textContent = `${item.phone}`
        websiteLink.setAttribute("href", `${item.website}`);
        websiteLink.textContent = "Visit Website";
        websiteLink.classList.add("heading-sm");
        websiteLink.classList.add("button");
        titleWrapper.classList.add("visit")

        titleWrapper.appendChild(websiteLink);
        titleWrapper.appendChild(title);
        addressContainer.appendChild(address);
        addressContainer.appendChild(phoneNumber);
        card.appendChild(image);
        card.appendChild(titleWrapper)
        card.appendChild(addressContainer);
        
        businessContainer.appendChild(card);
    });

}

FetchMembers();

toggleBtn.addEventListener("click", () => {
    display.classList.toggle("list");
    toggleBtn.classList.toggle("list-active");
});