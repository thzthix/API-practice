const seachForm = document.getElementById("search-word");
const result = document.getElementById("result");
const title = document.getElementById("title");
const phonetic = document.getElementById("pronounce");
const wordClass = document.getElementById("wordclass");
const meaning = document.getElementById("meaning");
const example = document.getElementById("example");
const message = document.getElementById("message");
const sound = document.getElementById("sound");

let audioSrc;

const getDefinition = async (event) => {
  event.preventDefault();
  const searchVal = document.getElementById("search").value;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchVal}`
    );

    const data = await response.json();
    console.log(data[0]);
    message.classList.add("hide");
    result.classList.remove("hide");

    const audios = data[0].phonetics.filter((item) => item.audio !== "");
    audioSrc = audios[0].audio;
    title.textContent = data[0].word;
    phonetic.textContent = data[0].phonetic;
    wordClass.textContent = data[0].meanings[0].partOfSpeech;
    meaning.textContent = data[0].meanings[0].definitions[0].definition;
    example.textContent = data[0].meanings[0].definitions[0].example;
  } catch {
    message.classList.remove("hide");
    result.classList.add("hide");
  }
};

const audioPlay = () => {
  new Audio(audioSrc).play();
};
seachForm.addEventListener("submit", getDefinition);
sound.addEventListener("click", audioPlay);
