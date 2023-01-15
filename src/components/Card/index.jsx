import './Card.scss'
import { Link } from 'react-router-dom';

export default function Card({
    title,
    image,
    link,
    text='Checkout',
    key,
    style={},
    icon='arrow-right',
    className='card-default-style'
})
{

    return(
        <div
            key={key}
            className={'card '+className}
            style={{
                backgroundImage: `url(${image})`,
                ...style
            }}
        >
            <Link to={link}>
                <div>
                    <div>
                        <h2>{title}</h2>
                        <p>{text} {icon !== 'none' ? <i className={'fa fa-'+icon}></i> : null}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}