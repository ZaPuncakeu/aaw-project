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
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'anis2023'
        })
        await client.connect();
        const database = fs.readFileSync(`${__dirname}/setup_database.sql`).toString();
        const res = await client.query(database);
        console.log('Database initialized');
        client.end();
        resolve(true);
    });
}

function init_tables()
{
    return new Promise(async (resolve, reject) => {
        const client = new Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'anis2023',
            database: 'zoo_aaw'
        })

        await client.connect();
        const tables = fs.readFileSync(`${__dirname}/setup_tables.sql`).toString();
        const res = await client.query(tables);
        console.log('Tables created');
        client.end();
        resolve(true);
    });
}

