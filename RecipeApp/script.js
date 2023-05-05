const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const formAndIngredients = document.getElementById("detail-container");
const searchForm = document.getElementById("search-form");
const viewRecipeBtn = document.getElementById("view-btn");
const result = document.getElementById("result");
const recipeContainer = document.getElementById("recipe-container");
const closeBtn = document.getElementById("close-btn");

const INGREDIENTS_LINIT = 20;

let recipe = "";
const getIngredients = (data) => {
  const ul = document.createElement("ul");
  ul.id = "ingredients-ul";
  for (let i = 1; i <= INGREDIENTS_LINIT; i++) {
    if (data[`strIngredient${i}`].trim() === "") {
      break;
    }
    const li = document.createElement("li");
    li.textContent = data[`strMeasure${i}`] + " " + data[`strIngredient${i}`];
    ul.appendChild(li);
  }
  return ul;
};

const setRecipe = (recipe) => {
  recipeContainer.innerHTML = `<pre id="recipe-p">${recipe}</pre>`;
};
const onSubmitDishName = async (event) => {
  event.preventDefault();
  try {
    result.classList.remove("hide");
    const dishName = document.getElementById("search-input").value;
    if (dishName.trim() === "") {
      result.innerHTML =
        '<p class="message">The input field cannot be empty.</p>';
      return;
    }
    const response = await fetch(`${URL}${dishName}`);
    const json = await response.json();

    console.log(json.meals[0]);

    recipe = json.meals[0].strInstructions;
    result.innerHTML = `<div class="img-container">
<img src="${json.meals[0].strMealThumb}" alt="image of ${json.meals[0].strMeal}" />
</div>
<div class="name-and-country">
<p id="name">${json.meals[0].strMeal}</p>
<p id="country">${json.meals[0].strArea}</p>
</div>`;

    const ingredients = getIngredients(json.meals[0]);

    result.appendChild(ingredients);
    viewRecipeBtn.classList.remove("hide");
  } catch {
    result.innerHTML = '<p class="message">Please enter a valid dish name.</p>';
    viewRecipeBtn.classList.add("hide");
  }

  // console.log(json.meals[0].strIngredient1);
};

const onClickViewBtn = () => {
  recipeContainer.classList.remove("hide");
  closeBtn.classList.remove("hide");
  viewRecipeBtn.classList.add("hide");
  setRecipe(recipe);

  searchForm.classList.add("hide");
  result.classList.add("hide");
};

const closeRecipe = () => {
  recipeContainer.classList.add("hide");
  closeBtn.classList.add("hide");
  searchForm.classList.remove("hide");
  result.classList.remove("hide");
  viewRecipeBtn.classList.remove("hide");
};
viewRecipeBtn.addEventListener("click", onClickViewBtn);
searchForm.addEventListener("submit", onSubmitDishName);
closeBtn.addEventListener("click", closeRecipe);
