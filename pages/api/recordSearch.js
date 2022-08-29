import db from '../../lib/postgres'

export default async function handler(req, res) {

    const ip =
    req.ip ||
    req.headers['cf-connecting-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress

    const endpointHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
    const query = `INSERT INTO blakefrederick \
    (endpoint, ip, time) \
    VALUES ($1, $2, NOW())
    RETURNING id`
    const params = [endpointHost, ip]

    try {
        db.query(query, params, (error, result) => {
        console.log('result', result?.rows)
        return res.status(201).send({success: result?.rows[0]?.id !== undefined ? true : false})
        })
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

