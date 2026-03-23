import React from 'react'
import { useConnect } from '../customHooks/useConnect'


const searchDriver = () => {
    const { trip, connection, farDriver, setfarDriver, closeDriver, setcloseDriver, reDirectTimer, error, setError } = useConnect()
    return (
        <div className='h-full w-full '>
            searchDriver
        </div>
    )
}

export default searchDriver