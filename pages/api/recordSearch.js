import db from '../../lib/postgres'

export default async function handler(req, res) {

    const endpointHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
    const query = `INSERT INTO blakefrederick \
    (endpoint, time) \
    VALUES ($1, date(timezone('PST', now())))
    RETURNING id`
    const params = [endpointHost]

    try {
        db.query(query, params, (error, result) => {
        console.log('query', query)
        console.log('result', result.rows)
        return res.status(201).send({success: result.rows[0].id !== 'undefined' ? true : false})
        })
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

