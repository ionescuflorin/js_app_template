// Global app controller

// -------------- MODELS ---------------
import Search from "./models/Search";
import Recipe from "./models/Recipe";

// -------------- VIEWS ----------------
import * as searchView from "./views/searchView";

// ------------- OTHER IMPORTS ---------
import { elements, renderLoader, clearLoader } from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1) Get the query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query); // 'search' custom named property
    // 3) Prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result); // make reference to 'this.result'
    } catch (error) {
      alert("Something went wrong with the search...");
      clearLoader();
    }
  }
};

// ------------- Initializing event listeners ---------------------
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

// apply event delegation for parent div with '.closest()' method
elements.searchResPages.addEventListener("click", e => {
  // everywhere we click we receive the entire btn
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      alert("Error processing recipe");
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe)
// Pass multiple events to the same thing
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
