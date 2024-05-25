import React from 'react'
import {Carousel, ProductToday } from '../../components/Index'
function Home() {
  return (
    <div className='w-main'>
      <Carousel/>
      <ProductToday/>
    </div>
  )
}

export default Home