// Pour centraliser mes différents éléments de navbar
import { middleNav, rightNav } from './nav';

// Pour les animations
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import './Navbar.scss';

export default function Navbar({
    user
})
{
    return(
        <motion.nav 
            id="navbar"
            initial={{
                y: "-200%"
            }}

            animate={{
                y: 0
            }}

            transition={{
                duration: 0.5,
                bounce: 0
            }}
        >
            {/* Logo (L'image du logo est ajoutée via css)*/}
            <div id="left-nav">
                <Link to="/">
                    <button>
                        <div></div>
                    </button>
                </Link>
            </div>

            <div id="middle-nav">
                {
                    middleNav.map((nav, index) => {
                        return(
                            <Link to={nav.link} key={`middle-nav-${index}`}>
                                <button>
                                    {nav.icon ? <><i className={`fa fa-${nav.icon}`}></i>&nbsp;&nbsp;</> : null}
                                    {nav.title ? nav.title : null}
                                </button>
                            </Link>
                        )
                    })
                }
            </div>

            <div id="right-nav">
                {
                    rightNav[user ? "authenticated" : "unauthenticated"].map((nav, index) => {
                        return(
                            <Link to={nav.link} key={`right-nav-${index}`}>
                                <button>
                                    {nav.icon ? <><i className={`fa fa-${nav.icon}`}></i>&nbsp;&nbsp;</> : null}
                                    {nav.title ? nav.title : null}
                                </button>
                            </Link>
                        )
                    })
                }
            </div>
        </motion.nav>
    )
}



