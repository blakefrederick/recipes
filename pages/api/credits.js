import db from '../../lib/postgres'

export default async function handler(req, res) {

  const endpoint = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  const query = `SELECT COUNT(*) from blakefrederick WHERE DATE(time) = date(timezone('PST', now())) AND endpoint = $1`
  const params = [endpoint]

  try {
    // pool.query() will escape parameterized query
    db.query(query, params, (error, result) => {
      console.log('query', query)
      console.log('result', result)
      return res.status(201).send({success: true})
    })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}

