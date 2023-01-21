import { useParams } from 'react-router-dom';
import { getAttractionBySlug } from '../../requests/attractions'
import Loading from '../../components/Loading';
import './Attraction.scss'
import { motion } from 'framer-motion'
export default function Attraction()
{
    const { activity } = useParams();
    const [attraction, loading, error] = getAttractionBySlug(activity);
    console.log(attraction);
    return(
        <div id="attraction-info" style={{
            [loading ? 'height' : 'minHeight']: '100vh'
        }}>
            {
                loading ? 
                <Loading/>
                :
                <Description
                    data={attraction}
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
            className='info-attraction-container'
            initial={{
                opacity: 0
            }}

            animate={{
                opacity: 1
            }}
        >
            <div className='attraction-section-1'>
                <div style={{backgroundImage: `url(${data.image})`}}>
                </div>
                <div>
                    <h1 className='main-title'>{data.title}</h1>
                    
                    <hr/>
                    
                    <p>
                        {data.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}