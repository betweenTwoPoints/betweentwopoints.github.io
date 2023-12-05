const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get quotes from API
let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new quote
function newQuote() {
  loading();
  //Pick random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author is unknown
  //   if (!quote.author) {
  //     authorText.textContent = 'Unknown';
  //   } else {
  //     authorText.textContent = quote.author;
  //   }
  authorText.textContent = quote.author ? quote.author : "Unkown";
  //Check quote length, change font size
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch error here
  }
}

//Tweet the quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On load
getQuotes();
