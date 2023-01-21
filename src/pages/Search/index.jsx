import { useEffect } from 'react';
import { getAllAnimals } from '../../requests/animals';
import './Search.scss';
import Loading from '../../components/Loading';
import Grid from '../../components/Grid';
import { MenuItem, Select, TextField } from '@mui/material';
import { getSpiecies } from '../../requests/species';
import { useState } from 'react';

export default function Search()
{
    const {animals, getFavourites, addToFavourite, loading} = getAllAnimals();
    const [species, loading_species, error] = getSpiecies(); 

    const [searchBySpecie, setSearchBySpecie] = useState('');
    const [searchByName, setSearchByName] = useState('');
    
    console.log(animals);
    useEffect(() => 
    {
        getFavourites();
    }, [])

    return(
        <div id="search" style={{
            [loading ? 'height' : 'minHeight']: '100vh'
        }}>
            {
                loading ?
                    <Loading/>
                :
                <>
                    <h1 className='main-title'>Search for an animal <i className='fa fa-search'></i></h1>
                    <div style={{
                        width: '80%',
                        margin: 'auto'
                    }}>
                        <div style={{display: 'flex', gap: "50px"}}>
                            <div>
                                <h3 style={{fontFamily: 'Dosis'}}>By Name</h3>
                                <TextField
                                    type='search'
                                    placeholder='Search'
                                    onChange={e => setSearchByName(e.target.value)}
                                />
                            </div>
                            <div>
                                <h3 style={{fontFamily: 'Dosis'}}>By Specie</h3>
                                
                                <Select
                                    name="species"
                                    placeholder='Species'
                                    onChange={e => setSearchBySpecie(e.target.value)}
                                >
                                    <MenuItem value={''}>All</MenuItem>
                                    {
                                        species.map((sp, index) => {
                                            return(
                                                <MenuItem key={`specie-${index}`} value={sp.id_specie}>{sp.title}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        <Grid
                            titleKey='name'
                            data={animals.filter(a => a.name.toUpperCase().includes(searchByName.toUpperCase()) && ((typeof(searchBySpecie) == 'string' && searchBySpecie.replace(' ', '').length === 0) || searchBySpecie == a.species)).map(d => ({...d, image: `http://localhost:3001/animals/${JSON.parse(d.photos)[0]}`, link: `/animal/${d.slug}`}))}
                            imageKey={'photos'}
                        />
                    </div>
                </>
            }
        </div>
    )
}