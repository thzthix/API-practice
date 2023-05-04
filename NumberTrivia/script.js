const GET_URL = "http://numbersapi.com/";
const GET_RANDOM_URL = "http://numbersapi.com/random/trivia?json";
const searchForm = document.getElementById("search-box");
const getRandBtn = document.getElementById("get-random-fact-btn");
const getFact = async (event) => {
  event.preventDefault();
  try {
    const inputValue = document.getElementById("search-input").value;
    if (inputValue > 300) {
      console.log("please enter a number between 0 to 300");
      return;
    }
    const response = await fetch(`${GET_URL}${inputValue}`);
    const text = await response.text();

    const name = document.getElementById("name");

    const description = document.getElementById("description-p");
    name.textContent = inputValue;
    description.textContent = text;
    console.log(json);
  } catch {
    const inputValue = document.getElementById("search-input").value;
    console.log(`${URL}${inputValue}`);
  }
};
const getRandom = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(GET_RANDOM_URL);
    const json = await response.json();

    const name = document.getElementById("name");

    const description = document.getElementById("description-p");
    name.textContent = json.number;
    description.textContent = json.text;
    console.log(json);
  } catch {
    const inputValue = document.getElementById("search-input").value;
    console.log(`${URL}${inputValue}`);
  }
};
searchForm.addEventListener("submit", getFact);
getRandBtn.addEventListener("click", getRandom);
