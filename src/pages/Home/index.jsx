import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Map from '../../components/Map/Map';
import Section from '../../components/Section';
import { getAttractions } from '../../requests/attractions';
import { getSpiecies } from '../../requests/species';
import './Home.scss'

export default function Home()
{
    const [species, loading_species, error_species] = getSpiecies();
    const [attractions, loading_attractions, error_attraction] = getAttractions();
    return(
        <div id="home">
            <motion.div 
                className='container'
                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: 1,
                }}

                transition={{
                    duration: 0.5,
                    bounce: 0
                }}
            >
                <div>
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 100
                        }}
                        
                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: 1,
                            duration: 0.8,
                            bounce: 0
                        }}
                    >
                        Welcome to the <span>The Zoo</span>
                    </motion.h1>
                    <motion.h2
                        initial={{
                            opacity: 0,
                            y: 100
                        }}
                        
                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: 1.5,
                            duration: 0.8,
                            bounce: 0
                        }}
                    >
                        A place where you can connect with the wild
                    </motion.h2>

                    <Link to='/species' style={{textDecoration: 'none'}}>
                        <motion.div
                            initial={{
                                opacity: 0
                            }}

                            animate={{
                                opacity: 1
                            }}

                            transition={{
                                duration: 0.5,
                                delay: 1.8
                            }}

                            className="main-btn"
                        >
                            <div>
                                <p>Check out our animals</p>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
            
            <div className='home-section'>
                <div className='image-container'>
                    <div></div>
                </div>
                
                <div className='info-zoo'>
                    <h1 className='main-title'>Connect with the wild again</h1>
                    <p>
                        Opened in 2022, our Zoo hit a huge success due to the various activities and attractions for both 
                        adults and children. 
                        Our main goal is entertainement, but we also care a lot about education and knowledge of the wild by presenting
                        various species that might be unknown to many as well as their origins and lots of trivias.
                    </p>
                </div>
            </div>

            <div className='home-section'>
                <div className='info-zoo'>
                    <h1 className='main-title'>Protection is our motto</h1>
                    <p>
                        In our Zoo, we care about animal protection. Especially for endangered species. 
                        We give them shelter, food and mating environnement that mimics perfectly their natural
                        habitat. You can also help us with animal protection with donations or simply giving more love
                        to these beautiful creatures through our Zoo.
                    </p>
                </div>

                <div className='image-container'>
                    <div></div>
                </div>
            </div>

            <Section
                title={"Species you'll find here"}
                icon={"paw"}
                id="species-preview"
                data={species.map(s => ({...s, link: `/species/${s.slug}`})).slice(0, 5)}
                style={'styled'}
                decoration={
                    <>
                        <div style={{
                            width: "40vw",
                            height: "40vw",
                            borderRadius: "50%",
                            backgroundColor: "#FFBF00",
                            position: "absolute",
                            right: '-20vw',
                            zIndex: 1
                        }}></div>

                        <div style={{
                            width: "250px",
                            height: "250px",
                            borderRadius: "50%",
                            backgroundColor: "#FFBF00",
                            position: "absolute",
                            left: '-125px',
                            zIndex: 1
                        }}></div>
                    </>
                }
                btnText="See all the species you can find here!"
                btnLink="/species"
            />
            
            <h1 className='main-title' style={{textAlign: 'center'}}>Find our animals through the map!</h1>
            <Map
                style={{
                    width: '90%',
                    height: '700px',
                    margin: 'auto'
                }}
            />
            <br /><br />
                
        </div>
    )
}

