require('dotenv').config;

const pg = require('pg');

// const pgConnection = new pg.Pool({
//     user: 'postgres',
//     host: 'postgres',
//     database: process.env.POSTGRES_DB,
//     password: process.env.POSTGRES_PASSWORD,
//     port: 5432
// })

const pgConnection = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Inovia',
    password: '81005496',
    port: 5432
})

export default pgConnection;