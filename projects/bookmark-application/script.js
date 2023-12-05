const elementIds = [
  "modal",
  "show-modal",
  "close-modal",
  "bookmark-form",
  "website-name",
  "website-url",
  "bookmarks-container",
];

function getMultipleElementsByIds(...ids) {
  return ids.map((id) => document.getElementById(id));
}

const [
  modal,
  modalShow,
  modalClose,
  bookmarkForm,
  websiteNameEl,
  websiteUrlEl,
  bookmarksContainer,
] = getMultipleElementsByIds(...elementIds);

let bookmarks = [];

// Show modal, focus on input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Close modal
function closeModal() {
  modal.classList.remove("show-modal");
}

// Modal Event listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Validate form
function validate(urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const regex = new RegExp(expression);
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
    return false;
  }
  return true;
}

function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // ----------- Creating HTML Elements -----------
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon / link container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://www.google.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // ----------- Appending HTML Elements -----------
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch bookmarks
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create example google bookmark
    bookmarks = [
      {
        name: "Google",
        url: "https://google.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete bookmark
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localstorage, re-render DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Handle data from form
function storeBookmark(event) {
  event.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
fetchBookmarks();

// TESTING
const items = document.querySelectorAll(".item");
