import React from 'react'
import {Carousel, ProductToday, CouPon } from '../../components/Index'
import SportShoes from '../../components/SportShoes'

function Home() {
  return (
    <div className='w-main'>
      <Carousel/>
      <ProductToday/>
      <CouPon/>
      <SportShoes/>
    </div>
  )
}

export default Home