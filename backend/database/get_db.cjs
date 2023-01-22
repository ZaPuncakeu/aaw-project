const { Client } = require('pg');
require('dotenv').config();
const get_db = ()=>
{
    return new Client({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    })
}

module.exports = {
    get_db
}