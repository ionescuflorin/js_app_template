import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
}

/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 0 + 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 5 + 4 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 9 + 6 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 9 + 3 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 15 + 7 / newTitle = ['Pasta', 'with', 'tomato']

*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []
    // test if length is higher than the limit
    if (title.length > limit) {
        /** Alogrithm logic
         * split the title into its words
         * then you use the reduce method on the resulting array which then allows us to have an accumulator.
         * that accumulator is just like a variable that we can add to in each iteration of the loop.
         * and what we're then gonna do in each iteration of the loop is to test if the current titling plus the next word is still under the maximum length.
         */
        title.split(' ').reduce((acc, cur) => { 
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length
        }, 0); // turns into an array with 5 elements

        // return the reuslts
        return `${newTitle.join(' ')} ...`;

    } 
    return title;
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
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
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
