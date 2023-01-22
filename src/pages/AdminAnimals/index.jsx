import './AdminAnimals.scss';
import Grid from '../../components/Grid';
import Loading from '../../components/Loading'
import { getAllAnimals } from '../../requests/animals';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminAnimals()
{
    const {animals, loading, getAnimals, deleteAnimal} = getAllAnimals();
    function deleteAction(slug){
        if(window.confirm('Are you sure you want to delete it? It is not reversible...'))
        {
            
            deleteAnimal(slug);
            location.reload();
        }
    }

    useEffect(() => 
    {
        getAnimals();
    }, [])

    return(
        <div className='admin-page' id="admin-animals">
            <h1 className='main-title'>Animals</h1>
            <div className='admin-animals-grid'>
                {
                    loading ? 
                        <Loading/>
                    :
                    <>
                        <div className='add-animal'>
                            <Link to='/admin/animals/add-animal'>
                                <Button>
                                    <i className='fa fa-plus'></i>
                                    &nbsp;
                                    Add an animal
                                </Button>
                            </Link>
                        </div>
                        <Grid
                            data={animals}
                            editable={true}
                            deleteAction={deleteAction}
                            imageKey='photos'
                        />
                    </>
                }
            </div>
        </div>
    )
}