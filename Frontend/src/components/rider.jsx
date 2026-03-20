import React, { useEffect, useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import Nav from './nav'
import Choose from './choose'
import { context } from '../customHooks/useContext'
import { useLocation } from 'react-router-dom'

const Rider = () => {
  const [load, setload] = useState(true)
  const [next, setnext, details, setdetails] = useDetails('rider', setload)
  const [location, setlocation] = useState({
    source: 'Your Location',
    destination: 'Medicaps University'
  })

  const l = useLocation()

  const [uiType, setuiType] = useState((second => {
    let arr = l.pathname.split('/')
    return arr[1];
  }))


  return (
    <div className='h-screen w-full relative bg-primary-background'>
      {load ? (
        <Loader />
      ) : (
        <context.Provider value={{ location, setlocation, }}>
          <div className='w-full flex flex-col items-center h-screen overflow-y-auto '>

            <div className='w-full max-w-md'>
              <Choose />
            </div>
            <Nav />
          </div>
        </context.Provider>
      )}
    </div>
  )
}

export default Rider