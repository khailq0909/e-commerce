import React from 'react'
import BgTopHeaderSale from '../assets/images/bg-top-header-sale.jpeg'
function HeaderSale() {
  return (
    <div className='w-full h-[40px] bg-main flex justify-center items-center'>
      <div className="sale-infor w-main text-center text-white font-semibold">
          Top 100 Products <span className='font-normal ms-1'>See more</span>
      </div>
    </div>
  )
}

export default HeaderSale