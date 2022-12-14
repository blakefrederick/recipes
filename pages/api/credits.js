import db from '../../lib/postgres'

export default async function handler(req, res) {

  const endpoint = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  const query = `SELECT COUNT(*) from blakefrederick WHERE DATE(time) = DATE(NOW()) AND endpoint = $1`
  const creditsPerDay = 42;
  const params = [endpoint]

  try {
    // pool.query() will escape parameterized query
    db.query(query, params, (error, result) => {
      const creditsRemaining = result?.rows[0]?.count !==  undefined ? creditsPerDay - result.rows[0].count : 0 
      return res.status(201).send({creditsRemaining})
    })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}

