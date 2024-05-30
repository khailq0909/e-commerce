import React from 'react'
import real from '../assets/images/real.webp'
import {
    faAward
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Real() {
    return (
        <div className='real pt-14 mb-14 border-t-[1px] border-[#c3c3c3] border-solid'>
            <div className="real_header uppercase text-[24px] font-semibold text-center mb-8">
                certified genuine
            </div>
            <div className="grid grid-cols-3">
                <div className="img col-span-2">
                    <img src={real} alt="certificate" />
                </div>
                <div className="content flex flex-col justify-center col-span-1">
                    <div className="header flex flex-row">
                        <div className="icon text-[48px] text-main me-4"><FontAwesomeIcon icon={faAward} /></div>
                        <p className="title text-[16px] font-semibold">
                            CERTIFICATE OF IMPORT OF GENUINE PRODUCTS FROM FAMOUS JAPANESE BRANDS...
                        </p>
                    </div>
                    <div className="container mt-6 mb-6 font-normal text-[14px] leading-6">
                        TokyoLife is committed to always providing customers with genuine good products from Japanese brands. All MADE IN JAPAN products have genuine import certificates from distributors to bring the best product experience to TokyoLife's beloved customers.
                    </div>
                    <div className="btn mt-3 cursor-pointer">
                        <span className='text-[14px] bg-main text-white font-normal pt-3 pb-3 ps-8 pe-8' >
                            Show more
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Real