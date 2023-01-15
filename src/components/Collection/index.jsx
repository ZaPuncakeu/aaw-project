import Grid from "../Grid";
import "./Collection.scss";
import { motion } from 'framer-motion';

export default function Collection({
    data,
    title,
    description,
    id,
    style='normal'
})
{
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
                <input type="search" id={'collection-'+id} placeholder="Search within our collection"/>
            </div>
            <Grid
                id={id}
                data={data}
                style={style}
            />
        </motion.div>
    )
}