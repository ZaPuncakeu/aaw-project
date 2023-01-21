import './AddAnimal.scss';
import Loading from '../../components/Loading'
import { getAnimalBySlug } from '../../requests/animals';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSpiecies } from '../../requests/species';
import Map from '../../components/Map/Map';
import { useParams } from 'react-router-dom';
export default function EditAnimal()
{
    const { slug } = useParams();
    const [
        animal, 
        edit_loading, 
        edit_error,
        addToFavourite,
        editAnimal
    ] = getAnimalBySlug(slug)
    const [aliases, setAliases] = useState([]);
    const [continent, setContinent] = useState(['']);
    const [country, setCountry] = useState(['']);
    const [weight, setWeight] = useState([0,0]); 
    const [length, setLength] = useState([0,0]); 
    const [newSpecie, setNewSpecie] = useState(false);
    const [species, loading, error] = getSpiecies();
    const [photos, setPhotos] = useState([]);
    const [position, setPosition] = useState([0,0]);
    const [oldPhotos, setOldPhotos] = useState([]);
    console.log(animal)
    useEffect(()=>{
        if(animal && Object.keys(animal).length > 0)
        {
            setAliases(animal.aliases);
            setContinent(animal.continent);
            setCountry(animal.countries);
            setWeight(animal.weight);
            setLength(animal.length);
            setOldPhotos(animal.photos);
            setPosition(animal.position)
        }
    }, [animal])
    

    function editWeight(e, index)
    {
        let w = [...weight];
        w[index] = e.target.value;
        setWeight(w);
    }

    function editLength(e, index)
    {
        let l = [...length];
        l[index] = e.target.value;
        setLength(l);
    }

    function addAliase(e, index) 
    {
        let arr = [...aliases];
        arr[index] = e.target.value;
        setAliases(arr);
    }

    function deleteAlias(index)
    {
        let arr = [...aliases].filter((_, i) => i !== index);
        console.log(arr);
        setAliases(arr);
    }

    function addContinent(e, index) 
    {
        let arr = [...continent];
        arr[index] = e.target.value;
        setContinent(arr);
    }

    function deleteContinent(index)
    {
        let arr = [...continent].filter((_, i) => i !== index);
        console.log(arr);
        setContinent(arr);
    }

    function addCountry(e, index) 
    {
        let arr = [...country];
        arr[index] = e.target.value;
        setCountry(arr);
    }

    function deleteCountry(index)
    {
        let arr = [...country].filter((_, i) => i !== index);
        console.log(arr);
        setCountry(arr);
    }

    useEffect(() => {
        console.log(photos);
    }, [photos])

    function handleSubmit(e)
    {
        e.preventDefault();

        if(photos.length === 0 && oldPhotos.length === 0)
        {
            alert("Please, at least upload 1 photo...");
            return;
        }

        let data = {...animal}
        for(let input of e.target)
        {
            if(input.name)
            {
                data[input.name] = input.value;
            }
        }

        data['aliases'] = aliases;
        data['photos'] = photos;
        data['oldPhotos'] = oldPhotos.map(ph => ph.split('/').pop());
        console.log(data)
        data['continent'] = continent;
        data['countries'] = country;
        data['weight'] = weight;
        data['length'] = length;
        data['position'] = position;

        console.log(data);

        const formData = new FormData();
        for(let key of Object.keys(data))
        {
            if(key !== 'photos')
                formData.append(key, data[key]);
            else {
                for(let img of data[key])
                {
                    formData.append('images', img);
                }
            }
                
        }

        editAnimal(formData);
    }

    return(
        <div className='admin-page' id="add-animal">
            {
                !animal || edit_loading ? 
                    <>
                        {JSON.stringify(animal)}
                    </>
                :
                <>
                    <h1 className='main-title'>Add an animal</h1>
                    <form onSubmit={handleSubmit}>
                        {
                            <div>
                                <TextField 
                                    label="Animal name" 
                                    variant="outlined"
                                    type="text"
                                    className='input-animal'
                                    defaultValue={animal.name}
                                    name='name'
                                    required
                                />

                                <br />
                                <div>
                                    <br />
                                    <h3 className='main-title'>Description</h3>
                                    <TextField
                                        placeholder="Description"
                                        name='description'
                                        defaultValue={animal.description}
                                        multiline
                                        rows={5}
                                        maxRows={4}
                                        style={{
                                            width: '100%'
                                        }}
                                        required
                                    />
                                </div>

                                <br /><br />
                                <TextField 
                                    label="Life span" 
                                    variant="outlined"
                                    defaultValue={animal.lifespan}
                                    type="number"
                                    className='input-animal'
                                    name='lifespan'
                                    required
                                />

                                <br />
                                <div>
                                    <br />
                                    <h3 className='main-title'>Lifestyle</h3>
                                    <TextField
                                        placeholder="Life style"
                                        name='lifestyle'
                                        defaultValue={animal.lifestyle}
                                        multiline
                                        rows={5}
                                        maxRows={4}
                                        style={{
                                            width: '100%'
                                        }}
                                        required
                                    />
                                </div>
                                
                                <br />
                                <div>
                                    <br />
                                    <h3 className='main-title'>Weight</h3>
                                    <div style={{
                                        display: 'flex',
                                        marginTop: '15px',
                                        marginBottom: '15px'
                                    }}>
                                        <TextField 
                                            label={`Min weight`} 
                                            variant="outlined"
                                            type="number"
                                            className='input-animal'
                                            value={weight[0]}
                                            required
                                            key={'min-weight'}
                                            onChange={e => editWeight(e, 0)}
                                        />

                                        <TextField 
                                            label={`Max weight`} 
                                            variant="outlined"
                                            type="number"
                                            value={weight[1]}
                                            className='input-animal'
                                            required
                                            key={'max-weight'}
                                            onChange={e => editWeight(e, 1)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <br />
                                    <h3 className='main-title'>Length</h3>
                                    <div style={{
                                        display: 'flex',
                                        marginTop: '15px',
                                        marginBottom: '15px'
                                    }}>
                                        <TextField 
                                            label={`Min length`} 
                                            variant="outlined"
                                            type="number"
                                            className='input-animal'
                                            value={length[0]}
                                            required
                                            key={'min-length'}
                                            onChange={e => editLength(e, 0)}
                                        />

                                        <TextField 
                                            label={`Min length`} 
                                            variant="outlined"
                                            value={length[1]}
                                            type="number"
                                            className='input-animal'
                                            required
                                            key={'max-length'}
                                            onChange={e => editLength(e, 1)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <br />
                                    <h3 className='main-title'>Aliases</h3>
                                    {
                                        aliases.map((val, index) => {
                                            return(
                                                <>
                                                    <div style={{
                                                        display: 'flex',
                                                        marginTop: '15px',
                                                        marginBottom: '15px'
                                                    }}>
                                                        <TextField 
                                                            label={`Alias ${index+1}`} 
                                                            variant="outlined"
                                                            type="text"
                                                            className='input-animal'
                                                            required
                                                            key={'add-animal-input-'+index}
                                                            onChange={e => addAliase(e, index)}
                                                            defaultValue={val}
                                                        />
                                                        <Button 
                                                            variant="outlined" 
                                                            color="error" 
                                                            onClick={e => deleteAlias(index)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    <Button
                                        onClick={e => setAliases([...aliases, ''])}
                                    >
                                        <i className='fa fa-plus'></i>
                                        &nbsp;
                                        Add an alias
                                    </Button>
                                </div>

                                <div>
                                    <br />
                                    <h3 className='main-title'>Continent</h3>
                                    {
                                        continent.map((val, index) => {
                                            return(
                                                <>
                                                    <div style={{
                                                        display: 'flex',
                                                        marginTop: '15px',
                                                        marginBottom: '15px'
                                                    }}>
                                                        <TextField 
                                                            label={`Continent ${index+1}`} 
                                                            variant="outlined"
                                                            type="text"
                                                            className='input-animal'
                                                            required
                                                            key={'continent-animal-input-'+index}
                                                            onChange={e => addContinent(e, index)}
                                                            value={val}
                                                        />
                                                        {
                                                            continent.length > 1 || index > 0 ? 
                                                            <Button 
                                                                variant="outlined" 
                                                                color="error" 
                                                                onClick={e => deleteContinent(index)}
                                                            >
                                                                Delete
                                                            </Button>
                                                            :
                                                            null
                                                        }
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    <Button
                                        onClick={e => setContinent([...continent, ''])}
                                    >
                                        <i className='fa fa-plus'></i>
                                        &nbsp;
                                        Add a continent
                                    </Button>
                                </div>

                                <div>
                                    <br />
                                    <h3 className='main-title'>Countries</h3>
                                    {
                                        country.map((val, index) => {
                                            return(
                                                <>
                                                    <div style={{
                                                        display: 'flex',
                                                        marginTop: '15px',
                                                        marginBottom: '15px'
                                                    }}>
                                                        <TextField 
                                                            label={`Country ${index+1}`} 
                                                            variant="outlined"
                                                            type="text"
                                                            className='input-animal'
                                                            required
                                                            key={'country-animal-input-'+index}
                                                            onChange={e => addCountry(e, index)}
                                                            value={val}
                                                        />
                                                        {
                                                            index > 0 || country.length > 0 ?
                                                            <Button 
                                                                variant="outlined" 
                                                                color="error" 
                                                                onClick={e => deleteCountry(index)}
                                                            >
                                                                Delete
                                                            </Button>
                                                            :
                                                            null
                                                        }
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    <Button
                                        onClick={e => setCountry([...country, ''])}
                                    >
                                        <i className='fa fa-plus'></i>
                                        &nbsp;
                                        Add a country
                                    </Button>
                                </div>

                                <br />
                                
                                <div>
                                    <br />
                                    <h3 className='main-title'>Origin description</h3>
                                    <TextField
                                        placeholder="Origin description"
                                        name='origin_description'
                                        multiline
                                        defaultValue={animal.origin_description}
                                        rows={5}
                                        maxRows={4}
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                </div>

                                <div>
                                    <br />
                                    <h3 className='main-title'>Specie</h3>
                                    {
                                        species.length > 0 ?
                                        <Select
                                            name="species"
                                            defaultValue={species[0].id_specie}
                                        >
                                            {
                                                species.map((sp, index) => {
                                                    return(
                                                        <MenuItem onClick={e => setNewSpecie(false)} key={`specie-${index}`} value={sp.id_specie}>{sp.title}</MenuItem>
                                                    )
                                                })
                                            }
                                            
                                            <MenuItem onClick={e => setNewSpecie(true)} value={'other'}>Other</MenuItem>
                                        </Select>
                                        :
                                        null
                                    }
                                    
                                    {
                                        newSpecie || species.length == 0 ? 
                                        <TextField 
                                            label="New specie name" 
                                            variant="outlined"
                                            type="text"
                                            className='input-animal'
                                            name='new_species'
                                            required
                                        />
                                        :
                                        null
                                    }
                                </div>

                                <div>
                                    <br />
                                    <h3 className='main-title'>Diet</h3>
                                    <Select
                                        name="diet"
                                        defaultValue={animal.diet}
                                    >
                                        <MenuItem value={'Herbivore'}>Herbivore</MenuItem>
                                        <MenuItem value={'Granivore'}>Granivore</MenuItem>
                                        <MenuItem value={'Omnivore'}>Omnivore</MenuItem>
                                        <MenuItem value={'Carnivore'}>Carnivore</MenuItem>
                                    </Select>
                                </div>

                                <br />
                                <div>
                                    <br />
                                    <h3 className='main-title'>Nutrition</h3>
                                    <TextField
                                        placeholder="Nutrition"
                                        name='nutrition'
                                        defaultValue={animal.nutrition}
                                        multiline
                                        rows={5}
                                        maxRows={4}
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                </div>

                                <br />
                                <div>
                                    <br />
                                    <h3 className='main-title'>Gallery</h3>
                                    <br />
                                    <Button variant="contained" component="label">
                                        Upload
                                        <input 
                                            hidden accept="image/*" multiple type="file"
                                            onChange={e => {
                                                if(e.target.files.length > 0)
                                                {
                                                    let arr = photos;
                                                    for(let p of e.target.files)
                                                    {
                                                        arr.push(p);
                                                    }
                                                    console.log(arr);
                                                    setPhotos([...arr]);
                                                }
                                            }} 
                                        />
                                    </Button>
                                    <br /><br />
                                    <div style={{
                                        width: '100%',
                                        overflowX: 'auto',
                                        overflowY: 'visible',
                                        flexShrink: 0,
                                        display: 'flex',
                                        gap: '10px'
                                    }}>
                                        {
                                            oldPhotos.map((photo, index) => {
                                                return(
                                                    <div
                                                        key={`photo-${index}`}
                                                        style={{
                                                            backgroundImage: `url(${photo})`,
                                                            width: '200px',
                                                            height: '200px',
                                                            backgroundSize: 'cover',
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            alignItems: 'flex-start',
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        <button 
                                                            type='button'
                                                            className='fa fa-trash'
                                                            style={{
                                                                border: 'none',
                                                                color: 'red',
                                                                fontSize: '1.5rem',
                                                                backgroundColor: 'transparent',
                                                                zIndex: 99,
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={e => {
                                                                setOldPhotos([...oldPhotos].filter((_, i) => index !== i));
                                                            }}
                                                        >
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            photos.map((photo, index) => {
                                                return(
                                                    <div
                                                        key={`photo-${index}`}
                                                        style={{
                                                            backgroundImage: `url(${URL.createObjectURL(photo)})`,
                                                            width: '200px',
                                                            height: '200px',
                                                            backgroundSize: 'cover',
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            alignItems: 'flex-start',
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        <button 
                                                            type='button'
                                                            className='fa fa-trash'
                                                            style={{
                                                                border: 'none',
                                                                color: 'red',
                                                                fontSize: '1.5rem',
                                                                backgroundColor: 'transparent',
                                                                zIndex: 99,
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={e => {
                                                                setPhotos([...photos].filter((_, i) => index !== i));
                                                            }}
                                                        >
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <br />
                                    <Map
                                        style={{
                                            width: '100%',
                                            height: '500px'
                                        }}
                                        marker={position}
                                        setMarker={setPosition}
                                        editable
                                    />
                                    <br />
                                    <Button 
                                        type='submit'
                                        disabled={edit_loading}
                                        style={{width: '100%'}}
                                        variant='contained'
                                    >
                                        Edit animal
                                    </Button>
                                    <br />
                                    <br />
                                </div>                           
                            </div>
                        }
                    </form>
                </>
            }
        </div>
    )
}