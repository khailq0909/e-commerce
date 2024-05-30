import React from 'react'
import {
    faTruckFast,
    faDollarSign,
    faThumbsUp,
    faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Services() {
    const data = [
        {
            icon: <FontAwesomeIcon icon={faThumbsUp} className='text-[36px] w-[40px] h-[40px] text-white bg-main rounded-[50%] p-3' />,
            title: 'High Quality',
            description: 'Enjoy top quality items at reasonable prices'
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} className='text-[36px]  w-[40px] h-[40px] text-white bg-main rounded-[50%] p-3' />,
            title: 'Support 24/7',
            description: 'Get instant support whenever you need it'
        },
        {
            icon: <FontAwesomeIcon icon={faTruckFast} className='text-[36px]  w-[40px] h-[40px] text-white bg-main rounded-[50%] p-3' />,
            title: 'Free Shipping',
            description: 'Free shipping for all orders over $100'
        },
        {
            icon: <FontAwesomeIcon icon={faDollarSign} className='text-[36px]  w-[40px] h-[40px] text-white bg-main rounded-[50%] p-3' />,
            title: 'Save Payment',
            description: 'Many secure payment methods'
        }
    ]
    return (
        <div className='pt-16 w-main flex justify-between items-center border-t-[1px] border-[#c3c3c3] border-solid'>
            {
                data.map((e, i) => {
                    return (
                        <div key={i} className=' shadow-md max-w-[288px]'>
                            <div className="flex flex-col justify-center items-center content pt-[30px] pb-[30px] ps-[29px] pe-[29px]">
                                <div className="icon">{e.icon}</div>
                                <div className="title mt-[14px] mb-[14px] font-medium text-[14px] uppercase">{e.title}</div>
                                <div className="des text-center text-[12px] font-normal leading-4">{e.description}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Services