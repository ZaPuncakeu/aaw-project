const fs = require('fs');
const { Client } = require('pg');

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        await init_db();
        await init_tables();
        resolve(true);
    });
}

function init_db()
{
    return new Promise(async (resolve, reject) => {
        const client = new Client({
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD
        })
        await client.connect();
        const res = await client.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);
        console.log('Database initialized');
        client.end();
        resolve(true);
    });
}

function init_tables()
{
    return new Promise(async (resolve, reject) => {
        const client = new Client({
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        })

        await client.connect();
        const tables = fs.readFileSync(`${__dirname}/setup_tables.sql`).toString();
        const res = await client.query(tables);
        console.log('Tables created');
        client.end();
        resolve(true);
    });
}

