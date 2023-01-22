import './Footer.scss';

export default function Footer()
{
    return(
        <footer id="footer">
            <div className='infos'>
                <h1 className='main-title'>The Zoo</h1>
                <p>
                    <b>Created by:</b>
                    <br/>
                    Anis ROUANE - Ahlam BENDAHOU 
                    <br/> 
                    Adnane LAANANI - Ahmat MAHMAT SEID 
                </p>
            </div>
            <div><img src='/images/logo-white.png'/></div>
            <div className='socials'>
                <span className='main-title'>Follow us on:</span>
                <div>
                    <a href='https://instagram.com' target='_blank'><i className='fa fa-instagram'></i></a>
                    <a href='https://twitter.com' target='_blank'><i className='fa fa-twitter'></i></a>
                    <a href='https://facebook.com' target='_blank'><i className='fa fa-facebook'></i></a>
                    <a href='https://youtube.com' target='_blank'><i className='fa fa-youtube'></i></a>
                </div>
            </div>
        </footer>
    )
}