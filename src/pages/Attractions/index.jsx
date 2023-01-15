import Collection from '../../components/Collection';
import Loading from '../../components/Loading';
import { getAttractions } from '../../requests/attractions';
import './Attractions.scss';

export default function Attractions()
{
    const [attractions, loading, error] = getAttractions();
    return(
        <div id="attractions" style={{
            [loading ? 'height' : 'min-height']: '100vh'
        }}>
            {
                loading ?
                <Loading/>
                :
                <Collection
                    title="Our Zoo offers fun times too!"
                    data={attractions}
                />
            }
        </div>
    )
}