async function insertAnimal(db, data)
{
    console.log("Inserting animal...", data);
    const slug = data['name'].toLowerCase().replace(' ', '-');
    return new Promise(async (resolve, reject) => {
        try{
            const animal = await getAnimalBySlug(db, slug);
            if(animal.length > 0)
            {
                return reject({
                    'status': 'failure',
                    'message': 'This animal already exists'
                })
            }

            console.log("lifespan", data['lifespan'])
            await db.query('INSERT INTO animals (name, photos, aliases, continent, countries, description, origin_description, lifestyle, nutrition, diet, species, lifespan, position, weight, length, slug) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', [
                data['name'],
                JSON.stringify(data['photos']),
                JSON.stringify(data['aliases']),
                JSON.stringify(data['continent']),
                JSON.stringify(data['countries']),
                data['description'],
                data['origin_description'],
                data['lifestyle'],
                data['nutrition'],
                data['diet'],
                data['species'],
                data['lifespan'],
                JSON.stringify(data['position']),
                JSON.stringify(data['weight']),
                JSON.stringify(data['length']),
                slug
            ]);

            resolve('done');
        }catch(error) {
            console.log("Error insert animal...", error);
            reject(error);
        }
    });
}

async function editAnimal(db, data)
{
    console.log("Editing animal...", data);
    const slug = data['name'].toLowerCase().replace(' ', '-');
    return new Promise(async (resolve, reject) => {
        try{
            const animal = await getAnimalBySlug(db, slug);
            console.log(animal)
            if(animal.length > 0 && animal[0].id_animal !== data.id_animal)
            {
                return reject({
                    'status': 'failure',
                    'message': 'This animal already exists'
                })
            }

            console.log("lifespan", data['lifespan'])
            await db.query(`UPDATE animals 
                            SET name=$1, 
                                photos=$2, 
                                aliases=$3, 
                                continent=$4, 
                                countries=$5, 
                                description=$6, 
                                origin_description=$7, 
                                lifestyle=$8, 
                                nutrition=$9, 
                                diet=$10, 
                                species=$11, 
                                lifespan=$12, 
                                position=$13, 
                                weight=$14, 
                                length=$15, 
                                slug=$16
                            WHERE id_animal=$17`, [
                                data['name'],
                                JSON.stringify(data['photos']),
                                JSON.stringify(data['aliases']),
                                JSON.stringify(data['continent']),
                                JSON.stringify(data['countries']),
                                data['description'],
                                data['origin_description'],
                                data['lifestyle'],
                                data['nutrition'],
                                data['diet'],
                                data['species'],
                                data['lifespan'],
                                JSON.stringify(data['position']),
                                JSON.stringify(data['weight']),
                                JSON.stringify(data['length']),
                                slug,
                                data['id_animal']
                            ]);

            resolve('done');
        }catch(error) {
            console.log("Error editing animal...", error);
            reject(error);
        }
    });
}

function getAnimalBySlug(db, slug, user_type, id_user)
{
    return new Promise(async (resolve, reject) => {
        try{
            let res; 
            if(user_type === 'admin')
                res = await db.query('SELECT animals.*, title, species.slug AS specie_slug FROM animals, species WHERE animals.species = species.id_specie AND animals.slug=$1', [slug]);
            else {
                res = await db.query(`
                    SELECT animals.*, species.title, species.slug AS specie_slug, favourites.id_user AS liked
                    FROM animals 
                    INNER JOIN species ON species.id_specie=animals.species
                    LEFT JOIN favourites ON animals.id_animal = favourites.id_animal 
                    WHERE animals.slug = $1`, [
                    slug
                ]);

                res.rows = res.rows.map(r => ({...r, liked: r.liked === id_user}))
            }
                resolve(res.rows);
        }catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

function fetchSpecies(db)
{
    return new Promise(async (resolve, reject) => {
        try{
            const res = await db.query('SELECT COUNT(*) AS count, id_specie, title, image, species.slug FROM species, animals WHERE species.id_specie=animals.species GROUP BY species.id_specie');
            resolve(res.rows);
        }catch(error) {
            console.log("Error fetch species...", error);
            reject(error);
        }
    });
}

async function addSpecie(db, title, image)
{
    const slug = title.toLowerCase().replace(' ', '-');
    return new Promise(async (resolve, reject) => {
        try{
            const species = await fetchSpecies(db);
            if(species.find(s => s.slug == slug))
            {
                return reject({
                    'status': 'failure',
                    'message': 'This specie already exists'
                })
            }

            const result = await db.query('INSERT INTO species (title, slug, image) VALUES($1, $2, $3) RETURNING *', [
                title,
                slug,
                image
            ]);

            console.log(result);
            return resolve(result.rows[0].id_specie);
        }catch(error) {
            console.log("Error addSpecies...", error);
            return reject(error);
        }
    });
}

function getAllAnimals(db, user_type, id)
{
    return new Promise(async (resolve, reject) => {
        try{
            let res;
            if(user_type === 'admin')
            {
                res = await db.query('SELECT * FROM animals');
            }
            else 
            {
                console.log('here');
                res = await db.query('SELECT animals.*, id_user FROM animals LEFT JOIN favourites ON animals.id_animal = favourites.id_animal WHERE favourites.id_user = $1', [id]);
            }
            console.log(res.rows);
            resolve(res.rows);
        }catch(error) {
            reject(error);
        }
    });
}

function toggleFavourite(db, id_user, id_animal, slug)
{
    console.log(id_user, id_animal, slug);
    return new Promise(async (resolve, reject) => {
        try{
            let res = await db.query('SELECT * FROM favourites WHERE id_user=$1 AND id_animal=$2', [
                id_user,
                id_animal
            ]);
            
            if(res.rows.length > 0)
            {
                await db.query('DELETE FROM favourites WHERE id_user=$1 AND id_animal=$2', [
                    id_user,
                    id_animal
                ]);
            }
            else 
            {
                await db.query('INSERT INTO favourites (id_user, id_animal) VALUES($1, $2)', [
                    id_user,
                    id_animal
                ]);
            }

            resolve(true)
        }catch(error) {
            reject(error);
        }
    });
}

function deleteAnimal(db, slug)
{
    console.log(slug);
    return new Promise(async (resolve, reject) => {
        try{
            
            let res = await db.query(`
                DELETE FROM animals
                WHERE slug=$1`, [
                slug
            ]);
            resolve(res.rows);
        }catch(error) {
            console.log("Error fetch species...", error);
            reject(error);
        }
    })
}

function getFavourites(db, id_user)
{
    console.log("my_user", id_user);
    return new Promise(async (resolve, reject) => {
        try{
            
            let res = await db.query(`
                SELECT animals.*, species.title, favourites.id_user AS liked
                FROM species 
                INNER JOIN animals ON species.id_specie=animals.species
                INNER JOIN favourites ON animals.id_animal=favourites.id_animal
                WHERE favourites.id_user = $1`, [
                id_user
            ]);
            resolve(res.rows);

        }catch(error) {
            console.log("Error fetch species...", error);
            reject(error);
        }
    });
}

function getAnimalsBySpecieSlug(db, specie, user_type, id)
{
    return new Promise(async (resolve, reject) => {
        try{
            
            let res;
            if(user_type === 'admin')
            {
                res = await db.query('SELECT animals.*, species.title FROM species, animals WHERE species.id_specie=animals.species AND species.slug = $1', [
                    specie
                ]);
            }
            else 
            {
                res = await db.query(`
                    SELECT animals.*, species.title, favourites.id_user AS liked
                    FROM species 
                    INNER JOIN animals ON species.id_specie=animals.species
                    LEFT JOIN favourites ON animals.id_animal = favourites.id_animal 
                    WHERE species.slug = $1`, [
                    specie
                ]);

                res.rows = res.rows.map(r => ({...r, liked: r.liked === id}))
            }
            
            resolve(res.rows);
        }catch(error) {
            console.log("Error fetch species...", error);
            reject(error);
        }
    });
}


module.exports = {
    insertAnimal,
    getAnimalBySlug,
    fetchSpecies,
    addSpecie,
    getAllAnimals,
    getAnimalsBySpecieSlug,
    getAnimalBySlug,
    toggleFavourite,
    getFavourites,
    editAnimal,
    deleteAnimal
}