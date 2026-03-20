import React from 'react'
import location from '../assets/location.svg'
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const OnMap = ({ center }) => {

    if (!center) return <div>Loading...</div>;
    const medicaps = {
        lat: 22.6210,
        lng: 75.8036
    }
    return (
        <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
            onLoad={() => console.log('Maps API has loaded.')}
        >
            <Map
                zoom={13}
                defaultCenter={center}
                mapId={'4f33a08e76f55bd8683fa07d'}
                onCameraChanged={(event) => console.log(event)}
            >
                <AdvancedMarker position={center}>
                    <img src={location} className='h-7' alt="" />
                </AdvancedMarker>         
                   </Map>
        </APIProvider>
    )
}

export default OnMap;