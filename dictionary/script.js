const seachForm = document.getElementById("search-word");
const result = document.getElementById("result");
const title = document.getElementById("title");
const phonetic = document.getElementById("pronounce");
const wordClass = document.getElementById("wordclass");
const meaning = document.getElementById("meaning");
const example = document.getElementById("example");
const message = document.getElementById("message");

let audioSrc;

const audioPlay = () => {
  new Audio(audioSrc).play();
};

const getDefinition = async (event) => {
  event.preventDefault();
  const searchVal = document.getElementById("search").value;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchVal}`
    );

    const data = await response.json();
    console.log(data);
    result.innerHTML = `<div id="title-and-sound">
    <span id="title">${searchVal}</span>
    <button id="sound">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z"
        />
        <path
          d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z"
        />
      </svg>
    </button>
  </div>
  <p id="wordclass-and-pronounce">
    <span id="wordclass">${data[0].meanings[0].partOfSpeech}</span>
    <span id="pronounce">${data[0].phonetic}</span>
  </p>

  <p id="meaning">${data[0].meanings[0].definitions[0].definition}</p>

  
   
    <div id="example">${data[0].meanings[0].definitions[0].example || ""}</div>

    
`;
    audioSrc = data[0].phonetics[0].audio;

    document.getElementById("sound").addEventListener("click", audioPlay);
    // console.log(data[0]);
    // message.classList.add("hide");
    // result.classList.remove("hide");

    // audioSrc = audios[0].audio;
    // title.textContent = data[0].word;
    // phonetic.textContent = data[0].phonetic;
    // wordClass.textContent = data[0].meanings[0].partOfSpeech;
    // meaning.textContent = data[0].meanings[0].definitions[0].definition;
    // example.textContent = data[0].meanings[0].definitions[0].example;
  } catch {
    console.log("why????");
    result.innerHTML = `<p id="message">Couldn't find the Word</p>`;
  }
};
seachForm.addEventListener("submit", getDefinition);
