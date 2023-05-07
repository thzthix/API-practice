const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const result = document.getElementById("result");

const API_KEY = "5e308f3b1e13d1bcadbc2588c9dffb94";
const FETCH_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
let searhValue = "";

const getData = async (event) => {
  event.preventDefault();
  searhValue = searchInput.value;
  try {
    if (searhValue.trim() === "") {
      result.innerHTML = '<p class="message">Please enter a city name</p>';
      return;
    }
    searchInput.value = "";
    const response = await fetch(
      `${FETCH_URL}&q=${searhValue}&appid=${API_KEY}`
    );
    const json = await response.json();
    const name = json.name;

    const main = json.weather[0].main;
    const description = json.weather[0].description;
    const icon = json.weather[0].icon;
    const temp = json.main.temp;
    const minTemp = json.main["temp_min"];
    const maxTemp = json.main["temp_max"];

    console.log(json);
    console.log(main, description, icon);
    result.innerHTML = `
  <h2 id="name">${name}</h2>
  <div class="details">
    <p id="detail-1">${main}</p>
    <p id="detail-2">${description}</p>
  </div>
  <div class="icon-container">
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"/>
  </div>
  <div class="temps-div">
    <h3><span id="temp-h3">${temp}</span>&#176;</h3>
    <div class="temps-details">
      <div id="temps-min" class="temps-detail">
        <span class="temps-title">min</span>
        <p><span id="min">${minTemp}</span>&#176;</p>
      </div>
      <div id="temps-max" class="temps-detail">
        <span class="temps-title">max</span>
        <p><span id="max">${maxTemp}</span>&#176;</p>
      </div>
    </div>
  </div>`;
  } catch {
    result.innerHTML = '<p class="message">Invalid Input</p>';
  }
};

searchForm.addEventListener("submit", getData);

