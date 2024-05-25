import React, { useState, useEffect } from 'react';
import slide1 from '../assets/images/slide1.webp';
import slide2 from '../assets/images/slide2.webp';
import slide3 from '../assets/images/slide3.webp';
import slide4 from '../assets/images/slide4.webp';
import slide5 from '../assets/images/slide5.webp';
import {
    faChevronRight,
    faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Carousel() {
    const [isShow, setIsShow] = useState(false);
    const slides = [slide4, slide2, slide1, slide5];
    const [current, setCurrent] = useState(0);

    const prev = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    const next = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [current]);

    return (
        <div className='mt-12 overflow-hidden relative'
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
        >
            <div className='flex transition ease-linear duration-200'
                style={{
                    transform: `translateX(-${current * 100}%)`
                }}
            >
                {
                    slides.map((slide, i) => {
                        return (
                            <img src={slide} alt='slide' key={i} className='cursor-pointer w-[100%]'/>
                        )
                    })
                }
            </div>
            {
                isShow &&
                <div className="btn absolute w-main top-0 flex justify-between items-center h-full">
                    <FontAwesomeIcon icon={faChevronLeft} className='cursor-pointer text-white text-[26px] pt-2 pb-2 pr-3 pl-3 bg-[#626262] z-10' onClick={prev} />
                    <FontAwesomeIcon icon={faChevronRight} className='cursor-pointer text-white text-[26px] pt-2 pb-2 pr-3 pl-3 bg-[#626262] z-10' onClick={next} />
                </div>
            }
            <div className="absolute bottom-0 flex justify-center gap-3 w-[100%] pb-3">
                {
                    slides.map((s, i) => {
                        return <div
                            onClick={() => setCurrent(i)}
                            key={"circle" + i}
                            className={`rounded-full cursor-pointer w-2 h-2 border border-solid border-black ${i === current ? "bg-main" : "bg-white"}`}></div>
                    })
                }
            </div>
        </div>
    );
}

export default Carousel;
