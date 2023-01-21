import './EditableCard.scss'
import { Link } from 'react-router-dom';

export default function EditableCard({
    title,
    image,
    key,
    className='card-default-style',
    imageKey,
    slug,
    index,
    deleteAction
})
{
    return(
        <div
            key={key}
            className={'card '+className}
            style={{
                backgroundImage: `url(${imageKey === 'photos' ? image[0] : image})`
            }}
        >
            <div>
                <div>
                    <h2>{title}</h2>
                    <div>
                        <Link to={`/admin/animals/edit/${slug}`}>
                            <button onClick={e => action('edit', index)} className='fa fa-edit'></button>
                        </Link>

                        <button onClick={e => deleteAction(slug)} className='fa fa-trash'></button>
                    </div>
                </div>
            </div>
        </div>
    )
}