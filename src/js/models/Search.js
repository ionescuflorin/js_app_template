import axios from "axios";

export default class Search {
  // in constructor will write the properties we want that class to have
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      const res = await axios(
        `${proxy}https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      // store the data into the Search object in a property custom called result
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}

// FIRST EXAMPLE THAT WORKS
// async function getResults(query) {
//   const proxy = "https://cors-anywhere.herokuapp.com/";
//   const key = "DASDAFGAGSAFASD";
//   const res = await axios(
//     `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
//   );
//   console.log(res);
// }
