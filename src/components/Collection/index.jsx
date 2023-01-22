import Grid from "../Grid";
import "./Collection.scss";
import { motion } from 'framer-motion';
import { useState } from "react";

export default function Collection({
    data,
    title,
    description,
    id,
    style='normal',
    searchKey='title'
})
{
    const [search, setSearch] = useState('');
    return(
        <motion.div 
            initial={{opacity: 0}} 
            animate={{opacity: 1}}
            transition={{
                duration: 0.5
            }}  
            className="collection"
        >
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
            <div className='search-form'>
                <label htmlFor={'collection'+id}>Search within our collection</label>
                <br/>
                <input type="search" id={'collection-'+id} placeholder="Search within our collection" onChange={e => setSearch(e.target.value)}/>
            </div>
            <Grid
                id={id}
                data={data.filter(d => d[searchKey].toLowerCase().includes(search.toLowerCase()))}
                style={style}
            />
        </motion.div>
    )
}