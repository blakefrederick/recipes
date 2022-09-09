import axios from 'axios'

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    url: 'https://nft-explorer.p.rapidapi.com/search',
    params: {
      chain: 'eth',
      filter: 'name,attributes',
      q: req.query.title,
    },
    headers: {
      'X-RapidAPI-Host': 'nft-explorer.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_NFTS_KEY,
    },
  }
  try {
    let response = await axios(options)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error.response)
  }
}
