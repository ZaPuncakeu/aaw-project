import './InfoList.scss';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function InfoList({
    id,
    title,
    description,
    data,
    details_interface,
    addToFavourite
})
{
    const type = useSelector(state => state.user.token)
    const [search, setSearch] = useState('');
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
                <input type="search" id={'collection-'+id} placeholder="Search within our collection" onChange={e => setSearch(e.target.value)}/>
            </div>
            <div className="element-container">
                {
                    data.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map((e, i) => {
                        return(
                            <div key={id+"-"+i}>
                                <div>
                                    <h2>{e.name}</h2>
                                    <div></div>
                                    <p>{e.description.substring(0, 448)}...</p>
                                    <Link to={e.link}>
                                        <button>Click to know more...</button>
                                    </Link>
                                </div>
                                <div style={{backgroundImage: `url(${e.image})`}} className='image'>
                                    {
                                        type === 'user' ? 
                                        <span 
                                            className='fa fa-heart'
                                            style={{
                                                color: e.liked ? 'red' : 'white',
                                                fontSize: '3rem',
                                                cursor: 'pointer'
                                            }}
                                            onClick={evt => addToFavourite(e.id_animal, e.slug)}
                                        ></span>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>
    )
}