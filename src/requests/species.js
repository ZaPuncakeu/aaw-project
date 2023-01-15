import { useState, useEffect } from "react";

export const getSpiecies = () => 
{
    const [loading, setLoading] = useState(true);
    const [species, setSpecies] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => 
    {
        (async () => {
            try
            {
                setTimeout(() => {
                    setSpecies(species_db);
                    setLoading(false);
                }, 2000);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        species.map(a => ({...a, link: `/species/${a.type}`, text: `${a.count} animals available`})), 
        loading,
        error
    ];
}

export const getEndangeredSpiecies = () => 
{
    const [loading, setLoading] = useState(true);
    const [species, setSpecies] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => 
    {
        (async () => {
            try
            {
                setTimeout(() => {
                    setSpecies(species_db);
                    setLoading(false);
                }, 2000);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        species.map(a => ({...a, link: `/species/${a.type}`, text: `${a.count} animals available`})), 
        loading,
        error
    ];
}

const species_db = [{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
},
{
    "image": '/images/home/animal.jpg',
    "title": 'Dogs',
    "type": 'dogs',
    'count': 10
}]


