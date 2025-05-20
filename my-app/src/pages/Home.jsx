import React from 'react'
import Landing from '../components/Landing'
import Perfect from '../components/Perfect'
import Build from '../components/Build'
import Schedule from '../components/Schedule'
import Offers from '../components/Offers'
import Price from '../components/Price'
import Testimony from '../components/Testimony'

const Home = () => {
  return (
    <>
      <Landing />
      <Perfect mt='md:mt-24 mt-14' />
      <Build />
      <Schedule />
      <Offers />
      <Price />
      <Testimony />
    </>
  )
}

export default Home