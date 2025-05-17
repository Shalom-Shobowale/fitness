import React from 'react'
import Landing2 from '../components/Landing2'
import Perfect from '../components/Perfect'
import Offers from '../components/Offers'
import Testimony from '../components/Testimony'

const About = () => {
  return (
    <div>
      <Landing2 name="About Us" link='About'/>
      <div className='mb-28'>
        <Perfect />
      </div>
      <Offers />
      <Testimony />
    </div>
  )
}

export default About