const filePath = "data/members.json";
const articleContainer = document.querySelector("#spotlight-articles")

async function fetchMembers() {

    const response = await fetch(filePath);
    const data = await response.json();

    displaySpotlightMembers(data.members);
}

function displaySpotlightMembers(members) {

    const premiumMembers = members.filter(member => member.membershipLevel === 3)

    articleContainer.innerHTML = "";

    premiumMembers.forEach(member => {

        const article = document.createElement("article");
        article.classList.add("member-card");

        const heading = document.createElement("h3");
        heading.classList.add("member-name");
        heading.classList.add("heading-md");
        heading.textContent = member.name;

        const image = document.createElement("img");
        image.setAttribute("src", `images/${member.image}`);
        image.setAttribute("alt", `${member.name}`);
        image.classList.add("company-logo");

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-section")

        const bottomCard = document.createElement("div")
        bottomCard.classList.add("bottom");

        const address = document.createElement("address");

        const addressLine = document.createElement("p");
        addressLine.classList.add("member-address");
        addressLine.textContent = member.address;
        
        const phone = document.createElement("p");
        phone.classList.add("member-contact");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.setAttribute("href", `${member.website}`);
        website.setAttribute("target", "_blank");
        website.classList.add("member-link");
        website.textContent = member.website;
        
        address.appendChild(addressLine);
        address.appendChild(phone);
        address.appendChild(website);

        imageWrapper.appendChild(image);
        
        bottomCard.appendChild(imageWrapper)
        bottomCard.appendChild(address);

        article.appendChild(heading);
        article.appendChild(bottomCard);
        
        articleContainer.appendChild(article);
    });

}

fetchMembers();
