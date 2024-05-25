import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../components/Index'


function Public() {
    return (
        <div className='w-full flex flex-col items-center'>
            <Header/>
            <div className="w-main mt-[127px]">
                <Outlet />
            </div>
            <Footer/>
        </div>
    )
}

export default Public