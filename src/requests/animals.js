import { useState, useEffect } from 'react';

import axios from 'redaxios'

export const getAnimalsOfSpecie = (specie) => 
{
    console.log("getAnimalsOfSpecie "+specie);
    const [loading, setLoading] = useState(true);
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(null);

    async function addToFavourite(id, slug)
    {
        try {
            const res = await axios.post(`http://localhost:3001/animal/favourite`, {id_animal: id, slug}, {withCredentials: true})
            setAnimals(animals.map(d => {
                return (
                    d.id_animal === id ?
                    ({...d, liked: !d.liked})
                    :
                    ({...d})
                )
            }));
        }catch(err)
        {
            alert("An error occured...");
            console.log(err);
        }
    }

    useEffect(() => 
    {
        (async () => {
            try
            {
                const res = await axios.get(`http://localhost:3001/species/${specie}`, {withCredentials: true})
                
                let animal = res.data.map(a => ({...a, image: 'http://localhost:3001/animals/'+JSON.parse(a.photos)[0]}))
                
                setLoading(false);
                console.log(animal)
                setAnimals(animal);
                setTitle(res.data[0].title)
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        animals.map(a => ({...a, "link": `/animal/${a.slug}`})), 
        loading, 
        error,
        title,
        addToFavourite
    ];
}

export const getAnimalBySlug = (slug) => 
{
    console.log("getAnimalsBySlug "+slug);
    const [loading, setLoading] = useState(true);
    const [animal, setAnimal] = useState({});
    const [error, setError] = useState(null)

    async function editAnimal(data, callback)
    {
        try {
            const res = await axios.post(`http://localhost:3001/animal/edit`, data, {withCredentials: true})
            setAnimal({
                ...animal,
                liked: !animal.liked
            });

            if(callback)
            {
                callback();
            }
        }catch(err)
        {
            alert("An error occured...");
            console.log(err);
        }
    }

    async function addToFavourite(id, slug)
    {
        try {
            const res = await axios.post(`http://localhost:3001/animal/favourite`, {id_animal: id, slug}, {withCredentials: true})
            setAnimal({
                ...animal,
                liked: !animal.liked
            });
        }catch(err)
        {
            alert("An error occured...");
            console.log(err);
        }
    }
    
    useEffect(() => 
    {
        console.log(setLoading);
        //setLoading(true)
        (async () => {
            try
            {
                const res = await axios.get(`http://localhost:3001/animal/${slug}`, {withCredentials: true});
                let animal_db = res.data.map(an => {
                    return {
                        ...an,
                        'photos': [...JSON.parse(an['photos']).map(p => `http://localhost:3001/animals/${p}`)],
                        'weight': [...JSON.parse(an['weight']).split(',')],
                        'length': [...JSON.parse(an['length']).split(',')],
                        'continent': [...JSON.parse(an['continent']).split(',')],
                        'countries': [...JSON.parse(an['countries']).split(',')],
                        'aliases': [...JSON.parse(an['aliases']).split(',')],
                        'position': [...JSON.parse(an['position']).split(',')]
                    }
                })[0]

                console.log(animal_db)
                setAnimal(animal_db);
                setLoading(false);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        animal, 
        loading, 
        error,
        addToFavourite,
        editAnimal
    ];
}

export const getAllAnimals = () => 
{
    const [loading, setLoading] = useState(false);
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null)
    
    async function addToFavourite(id, slug)
    {
        try {
            const res = await axios.post(`http://localhost:3001/animal/favourite`, {id_animal: id, slug}, {withCredentials: true})
            setAnimals(animals.map(d => {
                return (
                    d.id_animal === id ?
                    ({...d, liked: !d.liked})
                    :
                    ({...d})
                )
            }));
        }catch(err)
        {
            alert("An error occured...");
            console.log(err);
        }
    }


    async function deleteAnimal(slug)
    {
        setLoading(true);
        try{
            const res = await axios.delete('http://localhost:3001/animal/'+slug, {withCredentials: true});
            setLoading(false);
        }catch(err)
        {
            setLoading(false);
            console.log(err);
        }
    }

    async function addAnimal(data, callback)
    {
        setLoading(true);
        try{
            const res = await axios.post('http://localhost:3001/animals', data, {withCredentials: true});
            setLoading(false);
            if(callback)
            {
                callback();
            }
        }catch(err)
        {
            setLoading(false);
            console.log(err);
        }
    }

    async function getAnimals()
    {
        try
        {
            setLoading(true);
            const animal = await axios.get('http://localhost:3001/animal', {withCredentials: true});
            let animal_db = animal.data;
            console.log(animal_db);
            animal_db = animal_db.map(an => {
                return {
                    ...an,
                    'photos': JSON.parse(an['photos']).map(p => `http://localhost:3001/animals/${p}`),
                    'weight': JSON.parse(an['weight']).split(','),
                    'length': JSON.parse(an['length']).split(','),
                    'continent': JSON.parse(an['continent']).split(','),
                    'countries': JSON.parse(an['countries']).split(','),
                    'aliases': JSON.parse(an['aliases']).split(','),
                    'position': JSON.parse(an['position']).split(',')
                }
            })

            console.log(animal_db)
            setAnimals(animal_db);
            setLoading(false);
        }catch(err)
        {
            setLoading(false);
            setError(err);
        }
    }

    async function getFavourites()
    {
        console.log("HERE");
        try
        {
            setLoading(true);
            const animal = await axios.get('http://localhost:3001/favourite', {withCredentials: true});
            let animal_db = animal.data;
            console.log(animal_db)
            setAnimals(animal_db);
            setLoading(false);
        }catch(err)
        {
            console.log(err);
            setLoading(false);
            setError(err);
        }
    }
    return {
        animals, 
        loading, 
        addAnimal,
        getAnimals,
        error,
        getFavourites,
        addToFavourite,
        deleteAnimal
    };
}