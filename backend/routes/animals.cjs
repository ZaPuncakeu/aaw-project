const { get_db } = require("../database/get_db.cjs");
const fs = require('fs');
const { 
    insertAnimal, 
    fetchSpecies, 
    addSpecie, 
    getAllAnimals,
    getAnimalsBySpecieSlug,
    getAnimalBySlug,
    toggleFavourite,
    getFavourites,
    editAnimal,
    deleteAnimal
} = require("../database/animal_operations.cjs");

const addAnimal = async (req, res) => {
    const db = get_db();
    data = req.body;
    let specie_id = data['species'];
    
    try{
        await db.connect();
        
        const images = [];
        for(let img of req.files)
        {
            images.push(img.filename);
        }

        data['photos'] = [...images];

        if(Object.keys(data).indexOf('new_species') != -1)
        {
            specie_id = await addSpecie(db, data['new_species'], data['photos'][0]);
        }

        data['species'] = specie_id; 
        await insertAnimal(db, data);
        await db.end();
        res.status(201).json('New animal added');
    }catch(err)
    {
        for(let img of req.files)
        {
            try {
                fs.unlinkSync(img.path)
            } catch(err2) {
                console.error(err2)
            }
        }
        
        await db.end();
        res.status(500).json(err);
    }
}

const getSpeciesRoute = async (req, res) => {
    const db = get_db();
    try{
        await db.connect();
        const species = await fetchSpecies(db);
        
        await db.end();
        res.status(200).json(species);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }
}

const getAnimalsRoute = async (req, res) => {
    const db = get_db();
    try{
        await db.connect();
        const animals = await getAllAnimals(db, req['type'], req['user']);
        
        await db.end();
        res.status(200).json(animals);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }
}

const getAnimalsOfSpecie = async (req, res) => 
{
    const db = get_db();
    try{
        await db.connect();
        const animals = await getAnimalsBySpecieSlug(db, req.params.specie, req['type'], req['user']);
        
        await db.end();
        res.status(200).json(animals);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }
}

const toggleFavouriteRoute = async (req, res) => {
    
    const db = get_db();
    try{
        await db.connect();
        const animals = await toggleFavourite(db, req['user'], req.body.id_animal, req.body.slug);
        
        await db.end();
        res.status(200).json(animals);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }
}

const getAnimalRoute = async (req, res) => 
{
    
    const db = get_db();
    try{
        await db.connect();
        const animals = await getAnimalBySlug(db, req.params.slug, req['type'], req['user']);
        
        await db.end();
        res.status(200).json(animals);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }
}

const editAnimalRoute = async (req, res) => {
    const db = get_db();
    data = req.body;
    let specie_id = data['species'];

    try{
        await db.connect();
        
        const images = [];

        
        for(let img of data.oldPhotos.split(','))
        {
            images.push(img);
        }

        for(let img of req.files)
        {
            images.push(img.filename);
        }

        
        data['photos'] = [...images];

        if(Object.keys(data).indexOf('new_species') != -1)
        {
            specie_id = await addSpecie(db, data['new_species'], data['photos'][0]);
        }

        data['species'] = specie_id; 
        await editAnimal(db, data);
        await db.end();
        res.status(201).json('Animal edited');
    }catch(err)
    {
        for(let img of req.files)
        {
            try {
                fs.unlinkSync(img.path)
            } catch(err2) {
                console.error(err2)
            }
        }
        
        await db.end();
        res.status(500).json(err);
    }
}

const getFavouritesRoute = async (req, res) => 
{
    
    const db = get_db();
    try{
        await db.connect();
        const animals = await getFavourites(db, req['user']);
        
        await db.end();
        res.status(200).json(animals);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }
}

const deleteAnimalRoute = async (req, res) => 
{
    
    const db = get_db();
    try{
        await db.connect();
        const animals = await deleteAnimal(db, req.params.slug);
        
        await db.end();
        res.status(200).json(animals);
    }catch(err)
    {
        await db.end();
        res.status(500).json(err);
    }

}

module.exports = {
    addAnimal,
    getSpeciesRoute,
    getAnimalsRoute,
    getAnimalsOfSpecie,
    getAnimalRoute,
    toggleFavouriteRoute,
    getFavouritesRoute,
    editAnimalRoute,
    deleteAnimalRoute
}