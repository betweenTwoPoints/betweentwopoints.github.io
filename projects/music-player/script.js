// Helper function - Get multiple elements by Id
function getMultipleElementsById(...params) {
  const elementArray = [];
  for (const id of params) {
    elementArray.push(document.getElementById(id));
  }
  return elementArray;
}

// Array of ids of elements we want to target
const elementIds = [
  "title",
  "artist",
  "progress-container",
  "progress",
  "current-time",
  "duration",
  "prev",
  "play",
  "next",
];

// Targeting elements in the DOM
const [
  title,
  artist,
  progressContainer,
  progress,
  currentTimeEl,
  durationEl,
  prevBttn,
  playBttn,
  nextBttn,
] = getMultipleElementsById(...elementIds);
const image = document.querySelector("img");
const music = document.querySelector("audio");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBttn.classList.replace("fa-play", "fa-pause");
  playBttn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBttn.classList.replace("fa-pause", "fa-play");
  playBttn.setAttribute("title", "Play");
  music.pause();
}

// Play or pause event listener
playBttn.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On load - select first song
loadSong(songs[songIndex]);

function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Avoiding NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set progress bar
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event listeners
prevBttn.addEventListener("click", prevSong);
nextBttn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
