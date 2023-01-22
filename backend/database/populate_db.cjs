const fs = require("fs");
const { parse } = require("csv-parse");


const populate_animals = (db) => 
{
    return new Promise((resolve, reject) => 
    {
        let data = [];
        fs.createReadStream("./backend/database/animals.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            data.push(row);
        })
        .on("end", async function()
        {
            try{
                await insert_into(
                    'animals',
                    [
                        'name',
                        'photos',
                        'aliases',
                        'continent',
                        'countries',
                        'description',
                        'origin_description',
                        'lifestyle',
                        'nutrition',
                        'diet',
                        'species',
                        'lifespan',
                        'weight',
                        'length',
                        'slug',
                        'position'
                    ],
                    data,
                    db
                )
                resolve("done");
            }catch(err)
            {
                console.log(err);
                reject(err);
            }
        })
    })
}

const populate_species = (db) => 
{
    
    return new Promise((resolve, reject) => 
    {
        let data = [];
        fs.createReadStream("./backend/database/species.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            data.push(row);
        })
        .on("end", async function()
        {
            try{
                await insert_into(
                    'species',
                    [
                        'title',
                        'slug',
                        'image'
                    ],
                    data,
                    db
                )

                resolve("done");
            }catch(err)
            {
                console.log(err);
                reject(err);
            }
        })
    })
}

const insert_into = (table_name, keys, all_data, db) => 
{
    return new Promise(async(resolve, reject) => 
    {
        try {

            for(let data of all_data)
            {
                
                let query = `
                    INSERT INTO ${table_name}
                    (${keys.join(',')})
                    VALUES
                    (${
                        data.map((d, i) => `$${i}`).filter((d, i) => i !== 0).join(',')
                    })
                `;
                
                await db.query(query, data.filter((d, i) => i !== 0));
            }

            resolve("done");
        }catch(err)
        {
            console.log(err);
            reject(err);
        }
    })
}

module.exports = {
    populate_species,
    populate_animals
}