const searchForm = document.querySelector(".search-box");
const result = document.querySelector(".result");
const getCountry = async (event) => {
  event.preventDefault();
  try {
    const searchVal = document.getElementById("search-input").value;
    const response = await fetch(
      `https://restcountries.com/v3.1//name/${searchVal}?fullText=true`
    );
    const json = await response.json();
    console.log(json);
    result.innerHTML = ` 
    <div class="img-and-name">
    <img src="${json[0].flags.png}" alt="${json[0].flags.alt}" />
    <h3>${json[0].name.common}</h3>
  </div>
  <div class="details">
    <p>
      <span class="detail">Capital:</span
      ><span class="detail-inform">${json[0].capital[0]}</span>
    </p>
    <p>
      <span class="detail">Continent:</span>
      <span class="detail-inform">${json[0].continents[0]}</span>
    </p>
    <p>
      <span class="detail">Population:</span>
      <span class="detail-inform">${json[0].population}</span>
    </p>
    <p>
      <span class="detail">Currency:</span>
      <span class="detail-inform" id="detail-currency"></span>
    </p>
    <p>
      <span class="detail">Common Languages:</span>
      <span class="detail-inform" id="detail-languages"></span>
    </p>
  </div>
</div>`;
    const languages = document.getElementById("detail-languages");
    languages.textContent = Object.values(json[0].languages)
      .toString()
      .split(",")
      .join(", ");
    const currencies = document.getElementById("detail-currency");
    for (key in json[0].currencies) {
      if (
        json[0].currencies[
          Object.keys(json[0].currencies)[
            Object.keys(json[0].currencies).length - 1
          ]
        ] === json[0].currencies[key]
      ) {
        currencies.textContent += `${json[0].currencies[key].name} - ${key}`;
      } else {
        currencies.textContent += `${json[0].currencies[key].name} - ${key}, `;
      }
    }
  } catch {
    if (document.getElementById("search-input").value === "") {
      result.innerHTML =
        "<p class='message'>The input field cannot be empty.</p>";
    } else {
      result.innerHTML =
        "<p class='message'>Please enter a valid country name.</p>";
    }
  }
};
searchForm.addEventListener("submit", getCountry);
