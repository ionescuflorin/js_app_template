// Global app controller

// -------------- MODELS ---------------
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";

// -------------- VIEWS ----------------
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

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
    recipeView.clearRecipe();
    renderLoader(elements.recipe)

    // Highlight selected search item
    if(state.search) searchView.highlightSelected(id)

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

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

// Handling recipe button clicks using another form of event delegation
elements.recipe.addEventListener('click', e => {
  // .btn-decrease * -> any child elements of btn decrease 
  if(e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease button is clicked
      if(state.recipe.servings > 1) {
        
        state.recipe.updateServings('dec'); 
        recipeView.updateServingsIngredients(state.recipe);
      }

  } else if(e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button is clicked
      state.recipe.updateServings('inc')
      recipeView.updateServingsIngredients(state.recipe);

  }
})

window.l = new List();