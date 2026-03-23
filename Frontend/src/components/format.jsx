import React, { useEffect, useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import Nav from './nav'
import Choose from './choose'
import { context } from '../customHooks/useContext'
import { useLocation } from 'react-router-dom'

const format = () => {
  const [load, setload] = useState(true)
  const [next, setnext, details, setdetails] = useDetails('driver', setload)
  const [location, setlocation] = useState({
    source: 'Your Location',
    destination: 'Medicaps University'
  })

  const l = useLocation()

  const [uiType, setuiType] = useState(() => {
    let arr = l.pathname.split('/')
    return arr[1];
  })
  useEffect(() => {
    console.log(uiType)
  }, [uiType])


  return (
    <div className='h-full w-full relative bg-primary-background'>
      {load ? (
        <Loader />
      ) : (
        <context.Provider value={{ location, setlocation, uiType }}>
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

export default format