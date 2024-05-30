import React from 'react'
import {
    faQuoteLeft,
    faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ParagrapFooter() {
    return (
        <div className='w-full bg-main flex justify-center flex-col mt-[64px] items-center'>
            <div className="w-main pt-14 pb-14 flex flex-col items-center">
                <div className="footer_top">
                    <h1 className='uppercase text-[24px] text-white mb-8 font-semibold'>Tokyo Life</h1>
                </div>
                <div className="footer_content pl-[54px] pr-[54px] relative flex flex-col justify-center items-center">
                    <>
                        <span className='text-white font-semibold mb-3 italic'>TokyoLife would like to thank you for your support and contribution to creating more job opportunities for 142 people with disabilities.</span>
                        <p className='text-white font-light text-center leading-6'>TokyoLife is a retail store for genuine household appliances, cosmetics, and accessories of Japanese brands: Inomata, Ebisu, ORP Tokyo, Momotani, Naturie, Rohto (Hada Labo, Melano CC...), Kose (Line Softymo), Shiseido (Senka Series, Anessa, Tsubaki, Uno, D.Program), KAO (Biore, Laurier), Rosette, Unicharm, Rocket, Naris, Meishoku, Chuchu Baby, Deonatulle, Kumano, Taiyo Brush, Okamura, Dentultima, KAI, Pelican... TokyoLife perfume made in France. TokyoLife benign products are made in Japan. TokyoLife cosmetics are made in Japan and Korea. Fashion products and accessories brands: TokyoLife, TokyoNow, TokyoBasic, TokyoSmart, TokyoSecret. Branded consumer products: TokyoLife, TokyoHome, TokyoSword... and many other brands manufactured in Vietnam, China, Thailand...</p>
                    </>
                    <FontAwesomeIcon className='text-white text-[48px] absolute top-[-50px] left-0' icon={faQuoteLeft} />
                    <FontAwesomeIcon className='text-white text-[48px] absolute bottom-[0] right-[-30px]' icon={faQuoteRight} />
                </div>
            </div>
        </div>
    )
}

export default ParagrapFooter