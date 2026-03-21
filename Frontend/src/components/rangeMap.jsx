import React from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import sourceImg from '../assets/source.svg'
import destinationImg from '../assets/destination.svg'
import cross from '../assets/cross.svg'
import CircleComponent from './circle';
const RangeMap = ({ source, destination, radius }) => {

    if (!source || !destination) return <div>Loading...</div>;

    const handleProceed = () => {
        console.log("Proceed clicked");
    };

    return (
        <div className='h-full w-full '>
            <div className='h-full w-full'>
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                    <Map
                        defaultZoom={16}
                        defaultCenter={source}
                        mapId={import.meta.env.VITE_GOOGLE_MAPS_Id}
                    >
                        <AdvancedMarker position={source}>
                            <img src={sourceImg} className='h-7' alt="" />
                        </AdvancedMarker>
                        <CircleComponent radius={radius} center={source} />
                        <AdvancedMarker position={destination}>
                            <img src={destinationImg} className='w-10' alt="" />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>

                <div className='rounded-full absolute p-2 bottom-2 left-2 bg-primary-background'>
                    <img src={cross} className='h-6' alt="" />
                </div>
            </div>


        </div>
    )
}

export default RangeMap;