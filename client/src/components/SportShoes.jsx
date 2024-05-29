import React from 'react'
import CategoriesOverview from './CategoriesOverview'
import banner from '../assets/images/bannersale.webp'
function SportShoes() {
  return (
    <div>
      <CategoriesOverview title={"sport shoes"} param={"slug=shoes"} link ={"sport-shoes"} banner= {banner}/>
    </div>
  )
}

export default SportShoes