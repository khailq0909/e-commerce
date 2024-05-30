import React from 'react'
import {Carousel, ProductToday, CouPon, Services, SportShoes, Real } from '../../components/Index'

function Home() {
  return (
    <div className='w-main'>
      <Carousel/>
      <ProductToday/>
      <CouPon/>
      <SportShoes/>
      <Real/>
      <Services/>
    </div>
  )
}

export default Home