require('dotenv').config;

const pg = require('pg');

const pgConnection = new pg.Pool({
    user: 'postgres',
    host: 'postgres',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})

const connectToDb = async () => {
    try {
        await pgConnection.connect();
    } catch (err) {
        console.log(err);
        console.log("EU SOU UM MACACACO");
    }
}

connectToDb();

export default pgConnection;