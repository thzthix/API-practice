const GET_URL = "http://numbersapi.com/";
const GET_RANDOM_URL = "http://numbersapi.com/random/trivia?json";
const searchForm = document.getElementById("search-box");
const getRandBtn = document.getElementById("get-random-fact-btn");
const resultContainer = document.getElementById("result-container");

const sketchresult = (number, description) => {
  resultContainer.innerHTML = `        
  <h3 id="name">${number}</h3>
  <p id="description-p">${description}</p>`;
};
const getFact = async (event) => {
  event.preventDefault();
  try {
    const inputValue = document.getElementById("search-input").value;
    if (inputValue.trim() === "") {
      resultContainer.innerHTML = `<p class="message"> The input field cannot be empty.</p>`;
      return;
    } else if (
      parseInt(inputValue) > 300 ||
      parseInt(inputValue) < 0 ||
      typeof parseInt(inputValue.trim()) !== "number"
    ) {
      resultContainer.innerHTML = `<p class="message"> Please enter a number between 0 to 300.</p>`;

      return;
    }
    const response = await fetch(`${GET_URL}${inputValue}`);
    const text = await response.text();

    sketchresult(inputValue, text);
    console.log(json);
  } catch {
    const inputValue = document.getElementById("search-input").value;
    resultContainer.innerHTML = `<p class="message"> Please enter a number between 0 to 300.</p>`;
  }
};
const getRandom = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(GET_RANDOM_URL);
    const json = await response.json();
    sketchresult(json.number, json.text);
    console.log(json);
  } catch {
    const inputValue = document.getElementById("search-input").value;
   resultContainer.innerHTML = `<p class="message"> Please enter a number between 0 to 300.</p>`;
  }
};
searchForm.addEventListener("submit", getFact);
getRandBtn.addEventListener("click", getRandom);
