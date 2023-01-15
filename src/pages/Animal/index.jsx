import { Link, useParams } from 'react-router-dom';
import { getAnimalBySlug } from '../../requests/animals'
import Loading from '../../components/Loading';
import './Animal.scss'
import { motion } from 'framer-motion'
import Gallery from '../../components/Gallery';
export default function Animal()
{
    const { animalslug } = useParams();
    const [animal, loading, error] = getAnimalBySlug(animalslug);
    console.log(animal);
    return(
        <div id="animal-info" style={{
            [loading ? 'height' : 'min-height']: '100vh'
        }}>
            {
                loading ? 
                <Loading/>
                :
                <Description
                    data={animal}
                />
            }
        </div>
    )
}

function Description({
    data
})
{
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
                    <p>
                        <b>Also known as:</b><br/>
                        {data.aliases.join(', ').toUpperCase()}
                    </p>
                    
                    <hr/>
                    
                    <p>
                        <b>Specie:</b>
                        &nbsp;
                        <Link to={`/species/${data.species_slug}`}>
                            {data.species}
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
                        {data.diet.join(', ')}
                    </p>
                    
                    <hr/>

                    <div>
                        <div>
                            <h2 className='main-title'>weight</h2>
                            <span>{data.weight.join(' ~ ')} G</span>
                        </div>
                        
                        <div>
                            <h2 className='main-title'>life span</h2>
                            <span>{data.life_span} YEARS</span>
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