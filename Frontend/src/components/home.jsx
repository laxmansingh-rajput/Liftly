import React from 'react'
import { useState, useEffect } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import Nav from './nav'
import { get } from 'react-hook-form'
import { getLocation } from '../controller/getlocation'
const Home = () => {
  const [load, setload] = useState(true)
  const [next, setnext, details, setdetails] = useDetails('Home', setload)


  useEffect(() => {
    getLocation()
  }, [])


  return (
    <div className='h-screen w-full relative'>
      {
        load ? <Loader /> : <div className='w-full  flex flex-col items-center bg-primary-card-background h-screen overflow-y-auto relative'>

          <Nav />
        </div>
      }
    </div>
  )
}

export default Home