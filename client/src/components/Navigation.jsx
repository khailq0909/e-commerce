import React from 'react'
import {
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className='w-full h-[64px] bg-white shadow-md flex justify-center items-center'>
      <div className="w-main flex justify-around ps-[150px] pe-[150px]">
          <NavLink to={'/'} className='font-medium capitalize cursor-pointer'>home</NavLink>
          <NavLink to={'/about-us'} className='font-medium capitalize cursor-pointer'>about us</NavLink>
          <NavLink  className='m font-medium capitalize cursor-pointer'>products <FontAwesomeIcon icon={faSortDown} className='text-[12px] mb-1'/></NavLink>
          <NavLink to={'/all-store'} className='font-medium capitalize cursor-pointer'>store</NavLink>
          <NavLink to={'/contact-us'} className='font-medium capitalize cursor-pointer'>contact us</NavLink>
      </div>
    </div>
  )
}

export default Navigation