import './Gallery.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Gallery({
    images,
    className,
    containerStyle,
    duration=3000,
    mainImageStyle={
        desktopStyle: {
            width: '800px',
            height: '400px'
        },
        mobileStyle: {
            width: '100%',
            height: '400px'
        }
    },
    previewImageStyle={
        width: '200px',
        height: '100px'
    },
    autoPlay=true
})
{
    const [selected, setSelected] = useState(0);
    const [paused, setPaused] = useState(false);
    const [fullscreen, setFullScreen] = useState(false);
    const size = useWindowSize();
    const refs = useRef([]);
    const containerRef = useRef(null);
    let timeout;

    function getStyle()
    {
        return size.width < 854 ? mainImageStyle.mobileStyle : mainImageStyle.desktopStyle
    }

    function goTo(index, from='') 
    {
        if(from == 'click')
        {
            clearTimeout(timeout);
        }

        if(index < 0)
        {
            index = images.length - 1;
        }
        else if(index == images.length) 
        {
            index = 0;
        }
        
        setSelected(index);    
    }

    function startAutoPlay()
    {
        timeout = setTimeout(() => {
            goTo(selected + 1);
        }, duration);
    }

    useEffect(() => 
    {
        //containerRef.current.scrollLeft = refs.current[selected].offsetLeft - refs.current[selected].clientX;
        if(autoPlay && !paused)
        {
            startAutoPlay();
        }


    }, [selected])

    useEffect(() => 
    {
        if(autoPlay)
        {
            if(paused)
            {
                clearTimeout(timeout);
            }
            else 
            {
                startAutoPlay();
            }
        }
    }, [paused])

    return(
        <div 
            className='gallery' 
            style={{
                ...containerStyle,
                width: getStyle().width
            }}
        >
            <motion.div 
                style={{
                    ...getStyle(),
                    backgroundImage: `url(${images[selected]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}

                className={className}
                initial={{
                    opacity: 0
                }}

                animate={{
                    opacity: 1
                }}
            >
                <button onClick={e => goTo(selected - 1, 'click')} className='fa fa-angle-left'></button>
                <button onClick={e => goTo(selected + 1, 'click')} className='fa fa-angle-right'></button>
            </motion.div>
            
            <div className='gallery-options'>
                {
                    autoPlay ?
                        <button onClick={e => setPaused(!paused)} className={`fa fa-${paused ? 'play' : 'pause'}`}></button> 
                    :
                    null
                }
                <button onClick={e => setFullScreen(true)} className='fa fa-expand'></button>
            </div>

            <div ref={containerRef} className='gallery-preview'>
            {
                images.map((img, i) => 
                {
                    return(
                        <div 
                            ref={el => refs.current[i] = el}
                            key={'gallery-'+i}
                            style={{
                                ...previewImageStyle,
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                flexShrink: 0
                            }}

                            className={`${i === selected ? 'selected' : 'not-selected'}-gallery-image`}
                            
                            onClick={e => i !== selected && goTo(i, 'click')}
                        >
                        </div>
                    )
                })
            }
            </div>
            {
                fullscreen ? 
                <FullScreen photo={images[selected]} setFullScreen={setFullScreen}/>
                :
                null
            }
        </div>
    )
}

function FullScreen({
    photo,
    setFullScreen
})
{
    return(
        <div className='gallery-full-screen'>
            <div>
                <button onClick={e => setFullScreen(false)} className='fa fa-compress'></button>
                <img src={photo} style={{width: '100%'}} />
            </div>
        </div>
    )
}