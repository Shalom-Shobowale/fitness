import React from 'react'
import { PiGreaterThan } from "react-icons/pi";
import { NavLink } from 'react-router-dom'

const Landing2 = ({name, link}) => {
  return (
    <div className='bg-no-repeat bg-center bg-cover h-[60vh] flex flex-col items-center justify-center' style={{backgroundImage: "url('test-bg.jpg')"}}>
        <h1 className='text-6xl font-bold text-white text-center'>{name}</h1>
        <div className='flex gap-3 items-center text-white mt-5 text-sm'>
            <p><NavLink to="/">Home</NavLink></p>
            <p className='text-xs'><PiGreaterThan /></p>
            <p className='text-accent'>{link}</p>
        </div>
    </div>
  )
}

export default Landing2