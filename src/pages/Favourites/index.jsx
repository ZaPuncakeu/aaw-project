import { useEffect } from 'react';
import { getAllAnimals } from '../../requests/animals';
import './Favourites.scss';
import Loading from '../../components/Loading';
import Grid from '../../components/Grid';
import { TextField } from '@mui/material';

export default function Favourites()
{
    const {animals, getFavourites, addToFavourite, loading} = getAllAnimals();
    
    useEffect(() => 
    {
        getFavourites();
    }, [])

    return(
        <div id="favs" style={{
            [loading ? 'height' : 'minHeight']: '100vh'
        }}>
            {
                loading ?
                    <Loading/>
                :
                <>
                    <h1 className='main-title'>Your favourites!</h1>
                    <div style={{
                        width: '80%',
                        margin: 'auto'
                    }}>
                        <h3 style={{fontFamily: 'Dosis'}}>Search within your favourites</h3>
                        <TextField
                            type='search'
                            placeholder='Search'
                        />
                        <Grid
                            titleKey='name'
                            data={animals.map(d => ({...d, image: `http://localhost:3001/animals/${JSON.parse(d.photos)[0]}`, link: `/animal/${d.slug}`}))}
                            imageKey={'photos'}
                        />
                    </div>
                </>
            }
        </div>
    )
}