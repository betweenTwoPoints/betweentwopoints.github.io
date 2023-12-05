const projects = [
  {
    name: "Animated Navigation",
    location: "animated-navigation",
    description: "An animated navigation menu using CSS and Javascript.",
  },
  {
    name: "animated-template",
    location: "animated-template",
    description: "animated-template",
  },
  {
    name: "bookmark-application",
    location: "bookmark-application",
    description: "bookmark-application",
  },
  {
    name: "custom-countdown",
    location: "custom-countdown",
    description: "custom-countdown",
  },
  {
    name: "infinity-scroll",
    location: "infinity-scroll",
    description: "infinity-scroll",
  },
  {
    name: "joke-teller",
    location: "joke-teller",
    description: "joke-teller",
  },
  {
    name: "light-dark-mode",
    location: "light-dark-mode",
    description: "light-dark-mode",
  },
  {
    name: "music-player",
    location: "music-player",
    description: "music-player",
  },
  {
    name: "picture-in-picture",
    location: "picture-in-picture",
    description: "picture-in-picture",
  },
  {
    name: "quote-generator",
    location: "quote-generator",
    description: "quote-generator",
  },
];

const projectContainer = document.querySelector("section");

function renderProjects() {
  projects.forEach((project) => {
    const { location, name, description } = project;
    // Creating HTML Elements
    // Project card
    const card = document.createElement("article");
    card.classList.add("project-card");
    // Image & Link
    const image = document.createElement("img");
    image.classList.add("project-thumbnail");
    image.setAttribute("src", `images/${location}.jpg`);
    image.setAttribute("alt", name);
    const link = document.createElement("a");
    link.setAttribute("href", `projects/${location}/index.html`);
    link.setAttribute("target", "_blank");
    // Description
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");
    const descriptionTitle = document.createElement("h3");
    descriptionTitle.classList.add("description-title");
    descriptionTitle.textContent = name;
    const descriptionText = document.createElement("p");
    descriptionText.classList.add("description-text");
    descriptionText.textContent = description;

    // Appending HTML elements
    link.appendChild(image);
    descriptionContainer.append(descriptionTitle, descriptionText);
    card.append(link, descriptionContainer);
    projectContainer.appendChild(card);
  });
}

renderProjects();
