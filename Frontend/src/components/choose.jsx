import React, { useState, useRef } from 'react'
import search from '../assets/search.svg'
import back from '../assets/back.svg'
import { handleSearch } from '../controller/suggestions.js'
import { getCoordinates } from '../controller/request.js'
import { useNavigate } from 'react-router-dom'

const Choose = ({ location, setlocation, map, setmap }) => {
    const [showBar, setshowBar] = useState(false)
    const [suggetions, setsuggetions] = useState([])
    const [field, setfield] = useState(0)
    const source = useRef()
    const destination = useRef()
    const navigate = useNavigate()
    const handelSource = (e) => {
        setlocation(prev => ({
            ...prev,
            destination: 'Medicaps University',
            source: e.target.value
        }))
        handleSearch(location.source, setsuggetions)
    }
    const handelDesitination = (e) => {
        setlocation(prev => ({
            ...prev,
            source: 'Medicaps University',
            destination: e.target.value
        }))
        handleSearch(location.destination, setsuggetions)
    }
    const handleToggle = () => {
        setshowBar(!showBar)
    }
    const medicaps = {
        lat: 22.6210,
        lng: 75.8036
    }
    const handelMap = async (i) => {
        let tempLocation = location
        let source
        let destination
        if (field == 1) {
            let placeId = suggetions[i].placeId
            let a = await getCoordinates(placeId)
            tempLocation.source = JSON.stringify(a)
            source = suggetions[i].description
            destination = 'Medicaps university'
            tempLocation.destination = JSON.stringify(medicaps)
            setlocation(tempLocation)
        } else if (field == 2) {
            let placeId = suggetions[i].placeId
            let a = await getCoordinates(placeId)
            destination = suggetions[i].description
            source = 'Medicaps university'
            tempLocation.source = JSON.stringify(medicaps)
            tempLocation.destination = JSON.stringify(a)
            setlocation(tempLocation)
        }
        navigate(`/ride?data=${JSON.stringify(location)}&source=${source}&destination=${destination}`)
    }

    return (
        <div className='absolute w-full top-0 left-0 p-3'>
            {
                !showBar ? (
                    <div
                        className="h-12 w-full px-3 rounded-lg shadow-md border border-gray-300 
                                   flex items-center gap-3 font-medium cursor-pointer bg-white
                                   transition-all duration-200"
                        onClick={handleToggle}
                    >
                        <img src={search} className='h-5 opacity-70' alt="search" />
                        <span className='text-gray-500'>Where are you going?</span>
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow-lg p-4 relative'>
                        <div className='shadow-b-md'>
                            <div
                                className='flex items-center gap-2 mb-4 cursor-pointer'
                                onClick={handleToggle}
                            >
                                <img src={back} className='h-5' alt="back" />
                                <span className='font-medium'>Back</span>
                            </div>

                            <div className="flex flex-col gap-3 relative">
                                <div className="absolute left-4 top-6 bottom-6 w-[2px] bg-gray-300"></div>

                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 z-10"></div>
                                    <input
                                        type="text"
                                        ref={source}
                                        value={location.source}
                                        onClick={() => setfield(1)}
                                        onChange={(e) => handelSource(e)}
                                        placeholder="Enter pickup location"
                                        className="h-11 w-full px-3 rounded-lg border border-gray-300 
                                               focus:outline-none focus:ring-2 focus:ring-primary-button
                                               transition-all duration-200"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 z-10"></div>
                                    <input ref={destination}
                                        type="text"
                                        value={location.destination}
                                        onClick={() => setfield(2)}
                                        onChange={(e) => handelDesitination(e)}
                                        placeholder="Enter destination"
                                        className="h-11 w-full px-3 rounded-lg border border-gray-300 
                                               focus:outline-none focus:ring-2 focus:ring-primary-button
                                               transition-all duration-200"
                                    />
                                </div>
                            </div>
                            <div className='p-3 max-h-70 overflow-y-auto'>
                                {
                                    suggetions.map((_, i) => (
                                        <div key={i} className='border-b-2 border-gray-300  p-2 cursor-pointer hover:bg-black/5 transition-all
                                        ease-in duration-200 ' onClick={() => handelMap(i)}>
                                            {suggetions[i].description}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Choose