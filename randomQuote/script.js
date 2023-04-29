const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const getBtn = document.getElementById("get-btn");

const getQuote = async () => {
  quote.classList.remove("fade");
  author.classList.remove("fade");

  const response = await fetch("https://api.quotable.io/random");
  const json = await response.json();
  quote.textContent = json.content;
  author.textContent = json.author;

  quote.classList.add("fade");
  author.classList.add("fade");
};

window.addEventListener("load", getQuote);
getBtn.addEventListener("click", getQuote);
