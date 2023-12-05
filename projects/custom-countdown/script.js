const elementIds = [
  "input-container",
  "countdown-form",
  "date-picker",
  "countdown",
  "countdown-title",
  "countdown-button",
  "complete",
  "complete-info",
  "complete-button",
];

function getMultipleElementByIds(...params) {
  return params.map((id) => document.getElementById(id));
}

const [
  inputContainer,
  countdownForm,
  dateEl,
  countdownEl,
  countdownElTitle,
  countdownBttn,
  completeEl,
  completeElInfo,
  completeBttn,
] = getMultipleElementByIds(...elementIds);
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum to today
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate countdown
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input
    inputContainer.hidden = true;

    // If countdown had ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Populate countdown
      countdownElTitle.textContent = `Time left until: ${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Take values from form input
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.target[0].value;
  countdownDate = event.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // Change Date to Number
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

function restorePreviousCountdown() {
  // if value in localstorage, load that
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset all values
function reset() {
  // hide countdowns, show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // stop countdown
  clearInterval(countdownActive);
  //   Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBttn.addEventListener("click", reset);
completeBttn.addEventListener("click", reset);

// On load check localstorage
restorePreviousCountdown();
