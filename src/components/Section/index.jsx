import { Link } from 'react-router-dom';
import Grid from '../Grid';
import './Section.scss';

export default function Section({
    id,
    title,
    icon,
    data,
    decoration=null,
    titlePosition='center',
    btnLink,
    btnText,
    style='normal'
})
{
    return(
        <div 
            className="section" 
            id={id}
        >
            {
                decoration
            }
            
            <h1 style={{textAlign: titlePosition}}>
                {icon ? <><i className={`fa fa-${icon}`}></i>&nbsp;&nbsp;</>:null}
                {title}
            </h1>

            <div>
                <Grid
                    styled={true}
                    data={data}
                    id={"card"+id}
                    style={style}
                />
            </div>

            {
                btnLink ? 
                <div className='btn-container'>
                    <Link to={btnLink}>
                        <button>
                            {btnText}
                        </button>
                    </Link>
                </div>
                :
                null
            }
        </div>
    )
}