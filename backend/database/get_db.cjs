const { Client } = require('pg');

const get_db = ()=>
{
    return new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'anis2023',
        database: 'zoo_aaw'
    })
}

module.exports = {
    get_db
}