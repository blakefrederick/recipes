import * as pg from 'pg'

const config = {
  db: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: false,
  },
}

pg.types.setTypeParser(20, (val) => {
  return parseInt(val, 10)
})

const { Pool } = pg

export default new Pool(config.db)
