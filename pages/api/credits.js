import db from '../../lib/postgres'

export default async function handler(req, res) {

  const query = `INSERT INTO blakefrederick \
  (endpoint) \
  VALUES ($1)`
  const params = ['URL hessre']

  try {
    // pool.query() will escape parameterized query
    db.query(query, params, (error, result) => {
      console.log('query', query)
      return res.status(201).send({success: true})
    })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}

