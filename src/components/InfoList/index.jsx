import './InfoList.scss';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

export default function InfoList({
    id,
    title,
    description,
    data,
    details_interface
})
{
    console.log(data);
    return(
        <motion.div 
            id={id} 
            className='info-list'
            initial={{
                opacity: 0
            }}

            animate={{
                opacity: 1
            }}
        >
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
            <div className='search-form'>
                <label htmlFor={'collection'+id}>Search within our collection</label>
                <br/>
                <input type="search" id={'collection-'+id} placeholder="Search within our collection"/>
            </div>
            <div className="element-container">
                {
                    data.map((e, i) => {
                        return(
                            <div key={id+"-"+i}>
                                <div>
                                    <h2>{e.name}</h2>
                                    <div></div>
                                    <p>{e.text.substring(0, 448)}...</p>
                                    <Link to={e.link}>
                                        <button>Click to know more...</button>
                                    </Link>
                                </div>
                                <div style={{backgroundImage: `url(${e.image})`}} className='image'></div>
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>
    )
}