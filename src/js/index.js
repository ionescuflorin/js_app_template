// Global app controller
import axios from "axios";

// FIRST EXAMPLE THAT WORKS
// async function getResults(query) {
//   const proxy = "https://cors-anywhere.herokuapp.com/";
//   const key = "DASDAFGAGSAFASD";
//   const res = await axios(
//     `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
//   );
//   console.log(res);
// }

async function getResults(query) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      const res = await axios(
        `${proxy}https://forkify-api.herokuapp.com/api/search?q=${query}`
      );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error){
      alert(error)
  }
}

getResults("pizza");
