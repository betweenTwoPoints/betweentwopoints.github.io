// Helper functions
// Return array of multiple elements by id
function getMultipleElementsById(...params) {
  const eleArray = [];
  for (const element of params) {
    eleArray.push(document.getElementById(element));
  }
  return eleArray;
}
// Adding multiple event listeners
function addMultipleEventListener(eventType, target, ...params) {
  for (const element of params) {
    element.addEventListener(eventType, target);
  }
}
// Replace classes from navitems
function replaceNavClass(removeClass, addClass) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`${removeClass}-${i + 1}`, `${addClass}-${i + 1}`);
  });
}

// Assigning elements to constants
const [menuBars, overlay, ...navItems] = getMultipleElementsById(
  "menu-bars",
  "overlay",
  "nav-1",
  "nav-2",
  "nav-3",
  "nav-4",
  "nav-5"
);

function toggleNav() {
  // Toggle: Menu bars open/closed
  menuBars.classList.toggle("change");
  // Toggle: Menu active
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    // Animate in overlay
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    replaceNavClass("slide-out", "slide-in");
  } else {
    // Animate out overlay
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    replaceNavClass("slide-in", "slide-out");
  }
}

// Event listeners
addMultipleEventListener("click", toggleNav, menuBars, ...navItems);
