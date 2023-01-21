import { useState, useEffect } from "react";
import axios from 'redaxios'
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
                const res = await axios.get('http://localhost:3001/species', {withCredentials: true})
                setSpecies(res.data.map(s => ({...s, link: `${s.slug}`, image: `http://localhost:3001/animals/${s.image}`})));
                setLoading(false);
            }catch(err)
            {
                setLoading(false);
                setError(err);
            }
        })();
    }, [])

    return [
        species, 
        loading,
        error
    ];
}