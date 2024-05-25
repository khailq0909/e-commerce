import React from 'react'
import logo from '../assets/images/logo-white.webp'
import {
    faQuoteLeft,
    faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
    return (
        <>
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
            <div className="w-main mt-[64px]">
                <div className="grid grid-cols-12 gap-5">
                    <div className="grid grid-cols-4 col-span-9">
                        <div className="flex flex-col about">
                            <h3 className='uppercase font-semibold text-[14px]'>about tokyolife</h3>
                            <ul className='mt-3'>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Who are we</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Our commitment</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Recruitment</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Shop system</li>
                            </ul>
                        </div>
                        <div className="flex flex-col support">
                            <h3 className='uppercase font-semibold text-[14px]'>customer support</h3>
                            <ul className='mt-3'>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Ordering guide</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Payment methods</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Recruitment</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Policy of accumulation</li>
                            </ul>
                        </div>
                        <div className="flex flex-col doc">
                            <h3 className='uppercase font-semibold text-[14px]'>policy</h3>
                            <ul className='mt-3'>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Shipping policy</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Return policy</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Terms & Conditions</li>
                                <li className='mt-3 text-[14px] font-light hover:font-medium hover:underline cursor-pointer'>Privacy Policy</li>
                            </ul>
                        </div>
                        <div className="flex flex-col contact">
                            <h3 className='uppercase font-semibold text-[14px]'>contact</h3>
                            <ul className='mt-3'>
                                <li className='mt-3 text-[14px] font-medium'>Online purchasing support:</li>
                                <li className='mt-3 text-[14px] font-thin'>Hotline: 0247 308 2882</li>
                                <li className='mt-3 text-[14px] font-thin'>Email: contact@tokyolife.vn</li>
                                <li className='mt-3 text-[14px] font-thin'>Working hours: 8:30 - 22:00 daily.</li>
                            </ul>
                            <ul className='mt-3'>
                                <li className='mt-3 text-[14px] font-medium leading-6'>Complaint support and product warranty:</li>
                                <li className='mt-3 text-[14px] font-thin'>Hotline: 024 7300 6999</li>
                                <li className='mt-3 text-[14px] font-thin'>Email: cskh@tokyolife.vn</li>
                                <li className='mt-3 text-[14px] font-thin'>Working hours: 8:30 - 22:00 daily.</li>
                            </ul>
                        </div>
                        <div className="connect">
                            <h3 className='uppercase mb-3 font-semibold text-[14px]'>connect with tokyolife</h3>
                            <div className="mt-3">
                                <FontAwesomeIcon className='text-[24px] mr-3 cursor-pointer border-r border-solid border-black pr-4 text-blue-400' icon={faFacebookF} />
                                <FontAwesomeIcon className='text-[24px] mr-3 cursor-pointer border-r border-solid border-black pr-4 text-pink-500' icon={faInstagram} />
                                <FontAwesomeIcon className='text-[24px] mr-3 cursor-pointer border-r border-solid border-black pr-4 text-blue-500' icon={faTwitter} />
                                <FontAwesomeIcon className='text-[24px] mr-3 cursor-pointer text-main' icon={faYoutube} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col register_infor col-span-3">
                        <h3 className='uppercase font-semibold text-[14px] w-[100%] mb-3'>receive news from tokyolife</h3>
                        <div className='mt-3 flex'>
                            <input type="text" placeholder='Enter your email' className='w-[100%] p-2 outline-none rounded-l-sm border-2 border-black border-solid' />
                            <button className='bg-black text-white font-semibold text-[14px] p-2 rounded-r-sm'>Sign up</button>
                        </div>
                        <p className='w-[100%] mt-3 leading-6'>Install the App to receive <span className='text-main'>50% Birthday Discount</span> Earn Points for Every Bill</p>
                    </div>
                </div>
            </div>
            <div className="w-main mt-8">
                <div className='mb-8 w-main border-dashed border-b border-[#c3c3c3]'></div>
                <h3 className='uppercase mb-3 font-semibold text-[14px]'>STAAAR JOINT STOCK COMPANY</h3>
                <p className='text-[14px] pb-1'><span className='underline'>Adress:</span> Tầng 6, số 96 Thái Hà Phường Trung Liệt, Quận Đống Đa, Thành phố Hà Nội, Việt Nam.</p>
                <p className='text-[14px] pb-1'><span className='underline'>Representative:</span> Hoang Thi Van Anh</p>
                <p className='text-[14px] pb-1'><span className='underline'>Tax code:</span> 0109749326, date of business registration issuance April 29, 2021</p>
                <p className='text-[14px]'><span className='underline'>Phone:</span>024.7300.6999</p>
            </div>
            <div className="w-full bg-black flex items-center justify-center p-4 mt-8">
                <img src={logo} alt="logo" className='mr-6' />
                <p className='text-white text-[12px]'>Copyright © 2014-2024 Tokyolife.vn All Rights Reserved.</p>
            </div>
        </>
    )
}

export default Footer