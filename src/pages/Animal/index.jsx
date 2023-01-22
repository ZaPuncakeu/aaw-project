import { Link, useParams } from 'react-router-dom';
import { getAnimalBySlug } from '../../requests/animals'
import Loading from '../../components/Loading';
import './Animal.scss'
import { motion } from 'framer-motion'
import Gallery from '../../components/Gallery';
import { useSelector } from 'react-redux';
export default function Animal()
{
    const { animalslug } = useParams();
    const [animal, loading, error, addToFavourite] = getAnimalBySlug(animalslug);
    
    return(
        <div id="animal-info" style={{
            [loading ? 'height' : 'minHeight']: '100vh'
        }}>
            {
                loading ? 
                <Loading/>
                :
                <Description
                    data={animal}
                    addToFavourite={addToFavourite}
                />
            }
        </div>
    )
}

function Description({
    data,
    addToFavourite
})
{
    const type = useSelector(state => state.user.token)
    return(
        <motion.div 
            className='info-animal-container'
            initial={{
                opacity: 0
            }}

            animate={{
                opacity: 1
            }}
        >
            <div className='animal-section-1'>
                <div style={{backgroundImage: `url(${data.photos[0]})`}}>
                </div>
                <div>
                    <h1 className='main-title'>{data.name}</h1>
                    {
                        type === 'user' ?
                        <button 
                            className='add-to-fav'
                            onClick={e => addToFavourite(data.id_animal, data.slug)}
                            style={{
                                color: data.liked ? 'red' : 'black',
                                borderColor: data.liked ? 'red' : 'black'
                            }}
                        >
                            <i className={`fa fa-${data.liked ? 'times' : 'heart'}`}></i> &nbsp; {data.liked ? "Remove from":"Add to"} favourite
                        </button>
                        :
                        null
                    }
                    <p>
                        <b>Also known as:</b><br/>
                        {data.aliases.join(', ').toUpperCase()}
                    </p>
                    
                    <hr/>
                    
                    <p>
                        <b>Specie:</b>
                        &nbsp;
                        <Link to={`/species/${data.specie_slug}`}>
                            {data.title}
                        </Link>
                        <br/>

                        <b>Continent:</b>
                        &nbsp;
                        {data.continent.join(', ')}
                        <br/>
                        
                        <b>Countries:</b>
                        &nbsp;
                        {data.countries.join(', ')}
                        <br/>
                        
                        <b>Diet:</b>
                        &nbsp;
                        {data.diet}
                    </p>
                    
                    <hr/>

                    <div>
                        <div>
                            <h2 className='main-title'>weight</h2>
                            <span>{data.weight.join(' ~ ')} G</span>
                        </div>
                        
                        <div>
                            <h2 className='main-title'>life span</h2>
                            <span>{data.lifespan} YEARS</span>
                        </div>
                        
                        <div>
                            <h2 className='main-title'>Length</h2>
                            <span>{data.length.join(' ~ ')} CM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop: '25px'}}>
                <h2 className='main-title'>
                    Description
                </h2>

                <p className='animal-description'>
                    {data.description}
                </p>
            </div>

            <div style={{marginTop: '25px'}}>
                <h2 className='main-title'>
                    Origin
                </h2>

                <p className='animal-description'>
                    {data.origin_description}
                </p>
            </div>

            <div style={{marginTop: '25px'}}>
                <h2 className='main-title'>
                    Life style
                </h2>

                <p className='animal-description'>
                    {data.lifestyle}
                </p>
            </div>

            <div style={{marginTop: '55px', textAlign: 'center'}}>
                <h2 className='main-title'>
                    Gallery
                </h2>
                <br/>
                <Gallery
                    images={data.photos}
                />
            </div>
        </motion.div>
    )
}