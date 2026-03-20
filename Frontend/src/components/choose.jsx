import React, { useState, useRef, useEffect, useContext } from 'react'
import search from '../assets/search.svg'
import back from '../assets/back.svg'
import { handleSearch } from '../controller/suggestions.js'
import { getCoordinates } from '../controller/request.js'
import { useNavigate } from 'react-router-dom'
import { context } from '../customHooks/useContext.js'
import { useSetup } from '../customHooks/useSetup.js'
import MapComponent from './onMap.jsx'
import Loader from './loader.jsx'
import Select from './select.jsx'
import { getLocation } from '../controller/getlocation'

const Choose = () => {
    const navigate = useNavigate()
    const { location, setlocation } = useContext(context)
    const {
        showBar, setshowBar, center, setcenter,
        suggetions, setsuggetions,
        field, setfield,
        showButton, setshowButton,
        coordinates, setcoordinates,
        select, setselect
    } = useSetup()

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
        setfield("0")
    }
    const medicaps = {
        lat: 22.6210,
        lng: 75.8036
    }
    const handelMap = async (i) => {
        let source = (field == 1) ? suggetions[i].description : 'Medicaps University'
        let destination = (field == 2) ? suggetions[i].description : 'Medicaps University'
        let placeId = suggetions[i].placeId
        let placeCoordinate = await getCoordinates(placeId)
        console.log(placeCoordinate)

        const updatedLocation = {
            ...location,
            source: (field == 1) ? placeCoordinate : medicaps,
            destination: (field == 2) ? placeCoordinate : medicaps
        };
        setlocation(updatedLocation)
        navigate(`/ride?data=${JSON.stringify(updatedLocation)}&source=${source}&destination=${destination}`)
    }

    const handelProceed = async () => {
        let source = "Current Location"
        let destination = "Medicaps University"
        let currCoordinate = await getLocation()
        const updatedLocation = {
            ...location,
            source: currCoordinate,
            destination: medicaps
        };
        setlocation(updatedLocation)
        navigate(`/ride?data=${JSON.stringify(updatedLocation)}&source=${source}&destination=${destination}`)
    }

    return (
        <div className=' absolute  top-0 left-0  h-full w-full'>
            {
                !showBar ? (
                    <div className='space-y-3 h-full w-full'>
                        <div className='h-1/2 w-full'>
                            {(center) ? <MapComponent center={center} setcenter={setcenter} /> : <Loader />}
                        </div>
                        <div
                            className="h-12 w-auto px-3 rounded-full shadow-md border border-primary-card-border 
                                   flex items-center gap-3 font-medium cursor-pointer bg-primary-card-background
                                   transition-all duration-200 mx-3 "
                            onClick={handleToggle}
                        >
                            <img src={search} className='h-5 opacity-70' alt="search" />
                            <span className='text-primary-title font-semibold '>Where are you going?</span>
                        </div>
                    </div>

                ) : (
                    <div className={`bg-primary-primary rounded-xl shadow-lg ${select ? " " : "p-4"} relative h-full w-full `}>
                        {
                            select ? <div className='absoulte h-full w-full left-0 top-0'>
                                <Select center={center} coordinates={coordinates}
                                    setcoordinates={setcoordinates} setselect={setselect}
                                    field={field} location={location} setlocation={setlocation} />
                            </div> :
                                <div className='shadow-b-md'>
                                    <div
                                        className='flex items-center gap-2 mb-4 cursor-pointer'
                                        onClick={handleToggle}
                                    >
                                        <img src={back} className='h-5' alt="back" />
                                        <span className='font-medium'>Back</span>
                                    </div>

                                    <div className="flex flex-col gap-5  p-5 h-auto bg-primary-card-background rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500 z-10"></div>
                                            <input
                                                type="text"
                                                value={location.source}
                                                onClick={() => setfield(1)}
                                                onChange={(e) => handelSource(e)}
                                                placeholder="Enter pickup location"
                                                className="h-11 w-full px-3 rounded-lg border border-primary-card-border 
                                               focus:outline-none focus:ring-2 focus:ring-primary-button
                                               transition-all duration-200"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500 z-10"></div>
                                            <input
                                                type="text"
                                                value={location.destination}
                                                onClick={() => setfield(2)}
                                                onChange={(e) => handelDesitination(e)}
                                                placeholder="Enter destination"
                                                className="h-11 w-full px-3 rounded-lg border border-primary-card-border 
                                               focus:outline-none focus:ring-2 focus:ring-primary-button
                                               transition-all duration-200"
                                            />
                                        </div>

                                        <div className={`flex w-full items-center justify-between ${field == 0 && "justify-end"}`}>
                                            {
                                                (field != 0) && <button className=' rounded-full px-3  py-1 bg-primary-button cursor-pointer font-semibold
                                     text-white flex items-center justify-center' onClick={() => setselect(true)}>
                                                    Select on map
                                                </button>
                                            }
                                            {
                                                showButton && <button className=' self-end rounded-full px-3  py-1 bg-primary-button cursor-pointer font-semibold text-white flex items-center justify-center'
                                                    onClick={() => { handelProceed() }}
                                                >
                                                    Proceed
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    <div className=' p-3 max-h-70 overflow-y-auto'>
                                        {
                                            ((field == 1) && location.source != 'Your Location') && <div className=' border-b-2 border-primary-card-border  p-2 cursor-pointer hover:bg-black/5 transition-all
                                        ease-in duration-200 ' onClick={() => {
                                                    setlocation((Prev) => ({ ...Prev, source: 'Your Location' }))
                                                }}>
                                                Your Location
                                            </div>
                                        }
                                        {
                                            suggetions.map((_, i) => (
                                                <div key={i} className=' border-b-2 border-primary-card-border  p-2 cursor-pointer
                                         hover:bg-black/5 transition-all
                                        ease-in duration-200 ' onClick={() => handelMap(i)}>
                                                    {suggetions[i].description}zz
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Choose