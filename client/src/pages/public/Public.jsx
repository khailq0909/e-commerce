import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderSale, Header, Navigation } from '../../components/Index'

function Public() {
    return (
        <div className='w-full flex flex-col items-center'>
            <HeaderSale />
            <Header />
            <Navigation />
            <div className="w-main">
                <Outlet />
            </div>
        </div>
    )
}

export default Public