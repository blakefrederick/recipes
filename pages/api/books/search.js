import axios from "axios";

export default async function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://hapi-books.p.rapidapi.com/search/" + req.query.keyword,
    headers: {
      "x-rapidapi-host": "hapi-books.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_BOOKS_KEY,
    },
  };

  try {
    let response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response);
  }
}
