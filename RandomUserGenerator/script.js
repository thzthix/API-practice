const FETCH_URL = "https://random-data-api.com/api/v2/users";
const result = document.getElementById("result");
const getUserBtn = document.getElementById("get-btn");
const colors = [
  "--blue",
  " --purple",
  "--brown",
  "--orange",
  "--red",
  "--pink",
  " --green",
  " --dark-pink",
  "--light-purple",
];

const getRandomColor = (limit) => {
  const randIndex = Math.floor(Math.random() * limit);
  return colors[randIndex];
};
const changeStyles = () => {
  const randColor = getRandomColor(colors.length);
  console.log(randColor);
  document.querySelector("body").style.backgroundColor = `var(${randColor})`;
  document.querySelector("i").style.color = `var(${randColor})`;
  document.querySelector("img").style.borderColor = `var(${randColor})`;
};
const getUser = async () => {
  result.classList.remove("blur");
  const response = await fetch(FETCH_URL);
  const json = await response.json();
  console.log(json);
  result.innerHTML = `<div class="img-container">
  <img src="${json.avatar}" alt="image of user" srcset="" />
</div>
<h1 id="name">${json["first_name"]} ${json["last_name"]}</h1>
<div class="details">
  <p id="job">${json.employment.title}</p>
  <div class="place-container">
    <i class="fa-solid fa-location-dot"></i>
    <p id="place">${json.address.city}</p>
  </div>
</div>`;
  changeStyles();
  result.classList.add("blur");
};
getUserBtn.addEventListener("click", getUser);
window.addEventListener("load", getUser);
