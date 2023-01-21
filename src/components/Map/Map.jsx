import './Map.scss';
import map from '../../assets/map.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllAnimals } from '../../requests/animals';
import { Link } from 'react-router-dom';

export default function Map({
    editable=false,
    style,
    marker,
    setMarker
})
{   
    const {animals, getAnimals} = getAllAnimals()
    
    useEffect(() => 
    {
        if(!editable)
        {
            getAnimals();
        }
    }, [])

    useEffect(() => 
    {
        document.documentElement.onkeyup = e => 
        {
            if(mouseOver)
            {
                console.log(e.key)
                if(['+'].indexOf(e.key) != -1)
                {
                    console.log(e.key);
                    setScale(scale+0.1)
                }

                if(['-'].indexOf(e.key) != -1)
                {
                    console.log(e.key);
                    setScale(scale-0.1)
                }
            }
        }
    })
    const [scale, setScale] = useState(1);
    const [mouseOver, setMouseOver] = useState(false);
    const [mouseclicked, setMouseClicked] = useState(false);
    return(
        <div>
            {
                editable ? 
                <div>
                    <h3 className='main-title'>Coordinates</h3>
                    <div>
                        <label className='main-title' htmlFor="x-pos">X :</label>
                        &nbsp; <input value={marker[0]} id="x-pos" type="number" onChange={e => setMarker([e.target.value, marker[1]])} max="1526" min="0" placeholder='x'/>
                    </div>
                    <div>
                        <label className='main-title' htmlFor="y-pos">Y :</label>
                        &nbsp; <input value={marker[1]} id='y-pos' type="number" onChange={e => setMarker([marker[0], e.target.value])} max="1080" min="0" placeholder='y'/>
                    </div>
                    <p style={{fontFamily: 'Dosis'}}>Zoom in with '+' / out with '-'</p>
                </div>
                :
                null
            }
            <div 
                className='map-container'
                style={style}
            >
                <div 
                    onMouseMove={e => {
                        
                    }}
                    className='map'
                    style={{
                        backgroundImage: `url(${map})`,
                        transform: `scale(${scale})`
                    }}
                    onClick={() => setMouseClicked(true)}
                    onMouseDown={(e) => {
                        setMouseClicked(false);
                        let bounds = e.target.getBoundingClientRect();
                        let x = e.clientX - bounds.x;
                        let y = e.clientY - bounds.y;
                        console.log(x,y);
                        setMarker([x, y]);
                    }}
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                >
                    {
                        editable ? 
                        <div 
                            style={{
                                position: 'relative',
                                top: marker[1]+"px",
                                left: marker[0]+"px"
                            }}
                            className='marker fa fa-map-marker'
                        >
                        </div>
                        :
                        null
                    }
                    
                    {
                        !editable ?
                        <>
                            {
                                animals.map((an, index) => {
                                    return <Link to={`/animal/${an.slug}`}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundImage: `url(${an['photos'][0]})`,
                                            cursor: 'pointer',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            border: 'solid black 3px',
                                            position: 'relative',
                                            top: an['position'][1]+"px",
                                            left: an['position'][0]+"px"
                                        }}>
                                        </div>
                                    </Link>
                                })
                            }
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}