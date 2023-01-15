import Collection from '../../components/Collection';
import Loading from '../../components/Loading';
import { getSpiecies } from '../../requests/species';
import './Species.scss';

export default function Species()
{
    const [species, loading, error] = getSpiecies();

    return(
        <div id="species" style={{
            [loading ? 'height' : 'min-height']: '100vh'
        }}>
            {
                loading ?
                <Loading/>
                :
                <Collection
                    title="Species you'll find in our Zoo"
                    data={species}
                    style={'styled'}
                />
            }
        </div>
    )
}