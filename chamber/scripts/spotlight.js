const filePath = "data/members.json";
const articleContainer = document.querySelector("#spotlight-articles")

async function fetchMembers() {

    const response = await fetch(filePath);
    const data = await response.json();

    displaySpotlightMembers(data.members);
}

function displaySpotlightMembers(members) {

    const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    const randomSpotlights = qualifiedMembers.sort(() => 0.5 - Math.random());
    const premiumMembers = randomSpotlights.slice(0, 2);

    articleContainer.innerHTML = "";

    premiumMembers.forEach(member => {

        const article = document.createElement("article");
        article.classList.add("member-card");

        const heading = document.createElement("h3");
        heading.classList.add("member-name");
        heading.classList.add("heading-md");
        heading.textContent = member.name;

        const tierLabel = document.createElement("p");
        tierLabel.classList.add("member-tier");

        if (member.membershipLevel === 3) {
            tierLabel.textContent = "Gold";
        } else if (member.membershipLevel === 2) {
            tierLabel.textContent = "Silver";
        }

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
        addressLine.classList.add("upper-spaced");
        addressLine.textContent = member.address;
        
        const phone = document.createElement("p");
        phone.classList.add("member-contact");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.setAttribute("href", `${member.website}`);
        website.setAttribute("target", "_blank");
        website.classList.add("member-link");
        website.textContent = member.website.replace("https://", "").replace("www.", "");
        
        address.appendChild(addressLine);
        address.appendChild(phone);
        const linkContainer = document.createElement("div");
        linkContainer.classList.add("member-info");
        linkContainer.appendChild(website);
        linkContainer.appendChild(tierLabel);
        address.appendChild(linkContainer);

        imageWrapper.appendChild(image);
        
        bottomCard.appendChild(imageWrapper)
        bottomCard.appendChild(address);

        article.appendChild(heading);
        article.appendChild(bottomCard);
        
        articleContainer.appendChild(article);
    });

}

fetchMembers();
