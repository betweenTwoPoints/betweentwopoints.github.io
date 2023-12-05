const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

function switchToLightOrDarkMode(mode) {
  nav.style.backgroundColor = `rgb(${
    mode === "light" ? "255 255 255" : "0 0 0"
  } / 50%)`;
  textBox.style.backgroundColor = `rgb(${
    mode === "light" ? "0 0 0" : "255 255 255"
  } / 50%)`;
  toggleIcon.children[0].textContent = `${
    mode === "light" ? "Light Mode" : "Dark Mode"
  }`;
  if (mode === "light") {
    toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  } else {
    toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  }
  image1.src = `img/undraw_proud_coder_${mode}.svg`;
  image2.src = `img/undraw_feeling_proud_${mode}.svg`;
  image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    switchToLightOrDarkMode("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    switchToLightOrDarkMode("light");
  }
}

toggleSwitch.addEventListener("change", switchTheme);

// Check localStorage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    switchToLightOrDarkMode("dark");
  }
}
