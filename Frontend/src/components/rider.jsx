import React from 'react'
import { useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import Nav from './nav'
import Choose from './choose'
import Ride from './ride'

const rider = () => {
  const [load, setload] = useState(true)
  const [next, setnext, details, setdetails] = useDetails('rider', setload)
  const [map, setmap] = useState(false)
  const [showBar, setshowBar] = useState(false)
  const [location, setlocation] = useState({
    source: 'Your Location',
    destination: 'Medicaps University'
  })
  return (
    <div className='h-screen w-full relative'>
      {
        load ? <Loader /> : <div className='w-full  flex flex-col items-center bg-primary-card-background h-screen overflow-y-auto relative p-2 '>
          <Choose location={location} setlocation={setlocation} map={map} setmap={setmap} />
          {map && <Ride setmap={setmap} location={location} />}
          <Nav />
        </div>
      }
    </div>
  )
}

export default rider