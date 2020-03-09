// Global app controller

// -------------- MODELS ---------------
import Search from "./models/Search";

// -------------- VIEWS ----------------
import * as searchView from "./views/searchView";

// ------------- OTHER IMPORTS ---------
import { elements } from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
  // 1) Get the query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query); // 'search' custom named property
    // 3) Prepare UI for result
    searchView.clearInput();
    searchView.clearResults();

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results on UI
    searchView.renderResults(state.search.result) // make reference to 'this.result'
  }
};

// ------------- Initializing event listeners ---------------------
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
