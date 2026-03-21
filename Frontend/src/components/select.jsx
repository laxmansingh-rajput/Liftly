import React, { useContext } from 'react'
import location from '../assets/location.svg'
import marker from '../assets/marker.svg'
import cross from '../assets/back.svg'
import { useNavigate } from 'react-router-dom'
import { context } from '../customHooks/useContext.js'

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const Select = ({ center, coordinates, setcoordinates, setselect, field, location, setlocation }) => {
    const navigate = useNavigate()
    const { uiType } = useContext(context)
    if (!coordinates) return <div>Loading...</div>;
    const medicaps = {
        lat: 22.6210,
        lng: 75.8036
    }
    const handelProceed = async () => {
        let source = (field == 1) ? "Custom Location" : "Medicaps University"
        let destination = (field == 2) ? "Custom Location" : "Medicaps University"
        const updatedLocation = {
            ...location,
            source: (field == 1) ? coordinates : medicaps,
            destination: (field == 2) ? coordinates : medicaps,
        };
        setlocation(updatedLocation)
        if (uiType == 'rider')
            navigate(`/ride?data=${JSON.stringify(updatedLocation)}&source=${source}&destination=${destination}`)
        else {
            navigate(`/user?data=${JSON.stringify(updatedLocation)}&source=${source}&destination=${destination}`)
        }
    }

    return (
        <div className='h-full w-full space-y-3'>
            <div className='h-4/5 relative'>
                <APIProvider
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
                >
                    <Map
                        defaultZoom={13}
                        defaultCenter={center}
                        mapId={import.meta.env.VITE_GOOGLE_MAPS_Id}
                        onCameraChanged={(event) => {
                            setcoordinates(event.detail.center)
                        }}
                    >
                        <AdvancedMarker position={center}>
                            <img src={location} className='h-7' alt="" />
                        </AdvancedMarker>
                        <AdvancedMarker position={coordinates}>
                            <img src={marker} className='w-10' alt="" />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
                <div className=' rounded-full absolute p-2 bottom-2 left-2 bg-primary-background' onClick={() => setselect(false)}>
                    <img src={cross} className='h-6' alt="" />
                </div>
            </div>
            <button className='w-full h-12 bg-primary-button text-white text-xl font-semibold rounded-full'
                onClick={() => handelProceed()}>
                Select {`${(field == 1) ? "Start" : "End"}`}
            </button>
        </div >
    )
}

export default Select;