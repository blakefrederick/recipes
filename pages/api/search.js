import axios from "axios";

export default async function handler(req, res) {

  // Record search here so it cannot be manipulated, bypassed client-side
  const options = {
    method: "GET",
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
    params: {
      query: req.query.keyword ? req.query.keyword : 'Lentils',
      protein: req.query.protein ?? '',
      fat: req.query.fat ?? '',
      sugar: req.query.sugar ?? '',
      diet: 'vegan',
      excludeIngredients: req.query.exclude ?? '',
      number: "20",
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
  };

  try {
    let response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response);
  }
}
