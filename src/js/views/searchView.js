import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
}

const renderRecipe = recipe => {
  // render only one recipe
  const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.author}</p>
            </div>
        </a>
    </li>

    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  // we receive an array with 30 elements
  recipes.forEach(renderRecipe);
};
