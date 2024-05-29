const projects = [
  {
    name: "Animated Navigation",
    location: "animated-navigation",
    description: "An animated navigation menu using CSS and Javascript.",
  },
  {
    name: "Animated Template",
    location: "animated-template",
    description: "Using CSS to make an existing template my own.",
  },
  {
    name: "Bookmark Application",
    location: "bookmark-application",
    description: "Storing bookmarks in local storage using Javascript.",
  },
  {
    name: "Custom Countdown",
    location: "custom-countdown",
    description:
      "Working with date objects in Javascripts to create a countdown",
  },
  {
    name: "Infinity Scroll",
    location: "infinity-scroll",
    description:
      "Loading pictures whilst scrolling gives a infinite scroll effect.",
  },
  {
    name: "Joke Teller",
    location: "joke-teller",
    description:
      "Fetching from a joke API and using a text-to-speech API to output the jokes.",
  },
  {
    name: "Light-Dark Mode",
    location: "light-dark-mode",
    description:
      "CSS themes switch from light to dark mode and back with Javascript.",
  },
  {
    name: "Music Player",
    location: "music-player",
    description: "A musicplayer built with the audio element and Javascript.",
  },
  {
    name: "Picture in Picture",
    location: "picture-in-picture",
    description: "Experimenting with the picture in picture API.",
  },
  {
    name: "Quote Generator",
    location: "quote-generator",
    description: "Generate a quote and post it to Twitter.",
  },
  {
    name: "Spock Paper Scissor",
    location: "rock-paper-scissor",
    description: "Play the 'rock paper scissor lizard spock game'.",
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
    descriptionContainer.append(descriptionTitle, descriptionText);
    card.append(image, descriptionContainer);
    link.appendChild(card);
    projectContainer.appendChild(link);
  });

  // Push last row items to the left using empty elements
  const lastRowEmptySpace =
    projects.length % 4 === 0 ? 0 : 4 - (projects.length % 4);
  if (lastRowEmptySpace) {
    for (let i = 0; i < lastRowEmptySpace; i++) {
      const emptyElement = document.createElement("i");
      emptyElement.setAttribute("aria-hidden", "true");
      projectContainer.appendChild(emptyElement);
    }
  }
}

renderProjects();
