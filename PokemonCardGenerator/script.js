const URL = "https://pokeapi.co/api/v2/pokemon/";

const LIMIT = 151;

const getBtn = document.getElementById("generate-btn");
const getRandomPokeNum = (limit) => {
  return Math.floor(Math.random() * limit) + 1;
};
const getRandomURL = (randNum) => {
  return URL + randNum;
};
const getData = async () => {
  document.querySelector(".img-container").classList.remove("animating");
  const typesWrapper = document.querySelector(".type-wrapper");
  typesWrapper.innerHTML = "";
  const randNum = getRandomPokeNum(LIMIT);
  const fetchURL = getRandomURL(randNum);
  console.log(fetchURL);

  const response = await fetch(fetchURL);
  const json = await response.json();
  console.log(json);

  const name = json.forms[0].name;
  const hp = json.stats[0].base_stat;
  const types = json.types;
  const attack = json.stats[1].base_stat;
  const defense = json.stats[2].base_stat;
  const speed = json.stats[5].base_stat;
  const imgURL = json.sprites.other["official-artwork"]["front_default"];
  console.log(name, hp, types, attack, defense, speed);

  document.querySelector(".hp").textContent = hp;
  document.getElementById("name").textContent = name;
  document.getElementById("img").src = imgURL;

  // document.querySelector(".img-container").style.background = `radial-gradient(
  //   circle at 50% 0%,
  //   var(--${types[0].type.name}) 52%,
  //   var(--white) 36%
  // )`;

  // `radial-gradient(circle, var(--${types[0].type.name}) 100%, var(--white) 0);`;

  // TODO:this soluttion
  document.querySelector(".img-container").classList.add("animating");
  // document.querySelector(
  //   ".img-container"
  // ).style.backgroundImage = `radial-gradient(circle at 50% 0, var(--${types[0].type.name}) 52%, var(--white) 36%)`;
  // TODO:----this

  myMove(types[0].type.name);

  // document.querySelector(".img-container").style.backgroundColor = "green";
  //  document
  //   .querySelector(".img-container")
  //   .classList.add("animating");
  // const listener = document
  //   .querySelector(".img-container")
  //   .addEventListener("animationend", () => {
  //     document.querySelector(".img-container").classList.remove("animating");

  //     //this removes the listener after it runs so that it doesn't get re-added every time the button is clicked
  //     document
  //       .querySelector(".img-container")
  //       .removeEventListener("animationend", listener);
  //   });
  const div = document.createElement("div");
  div.classList.add("type-wrapper");
  types.forEach((type) => {
    const span = document.createElement("span");
    span.classList.add("type");
    span.textContent = type.type.name;
    span.style.backgroundColor = `var(--${type.type.name})`;
    console.log(types[0].type.name);
    typesWrapper.appendChild(span);
  });

  document.getElementById("attack").textContent = attack;
  document.getElementById("defense").textContent = defense;
  document.getElementById("speed").textContent = speed;
};
let id = null;

const myMove = (color) => {
  const elem = document.querySelector(".img-container");
  let pos = 37;
  clearInterval(id);
  const frame = () => {
    if (pos == 52) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.backgroundImage = `radial-gradient(circle at 50% 0, var(--${color}) ${pos}%, var(--white) 36%)`;
    }
  };
  id = setInterval(frame, 10);
};

window.addEventListener("load", getData);
getBtn.addEventListener("click", getData);
