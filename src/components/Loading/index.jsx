import './Loading.scss';
import loadingLogo from '../../assets/loading.svg';
export default function Loading({
    className='default-loading'
})
{
    return(
        <div 
            id='loading-screen' 
            className={className}
        >
            <img src={loadingLogo} alt="loading" />
        </div>
    )
}