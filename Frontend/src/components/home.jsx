import React from 'react'
import { useState, useEffect } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Nav from './nav'
import Format from './format'
const Home = () => {
  const [load, setload] = useState(true)
  const [next, setnext, details, setdetails] = useDetails('Home', setload)
  
  return (
    <div className='h-full w-full relative'>
      <Format />
      <Nav />
    </div>
  )
}

export default Home