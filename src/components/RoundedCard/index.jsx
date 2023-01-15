import './RoundedCard.scss'
import { Link } from 'react-router-dom';

export default function RoundedCard({
    title,
    image,
    link,
    className='card-default-style',
    key,
    text='Checkout',
    icon='arrow-right'
})
{
    return(
        <div
            key={key}
            className={'rounded-card '+className}
            style={{
                backgroundImage: `url(${image})`
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