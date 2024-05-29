import React from 'react'
import coupon from '../assets/images/sale.webp'

function CouPon() {
  return (
    <div className='w-main mt-[64px]'>
        <img src={coupon} alt="Coupon" className='w-[100%]' />
    </div>
  )
}

export default CouPon