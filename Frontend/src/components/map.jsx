import React, { useContext, useEffect, useState } from 'react';
import sourceImg from '../assets/source.svg'
import destinationImg from '../assets/destination.svg'
import { pathContext } from '../customHooks/useContext.js'

import {
    APIProvider,
    AdvancedMarker,
    Map as GoogleMap,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';
import RouterDrawer from './RouterDrawer'

const MyMap = () => {
    const { location, path, setpath, pathIndex, setpathIndex, alterPaths, setalterPaths } = useContext(pathContext)
    const source = location?.source;
    const destination = location?.destination;
    const sourceCoordinate = {
        lat: location.source.lat,
        lng: location.source.lng,
    }
    const destinationCoordinate = {
        lat: location.destination.lat,
        lng: location.destination.lng,
    }
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                <GoogleMap
                    defaultZoom={13}
                    defaultCenter={{
                        lat: source?.lat ?? 22.6210,
                        lng: source?.lng ?? 75.8036
                    }}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_Id}
                >
                    <RouterDrawer source={source} destination={destination} />
                    <AdvancedMarker position={sourceCoordinate}>
                        <img src={sourceImg} className='h-6' alt="" />
                    </AdvancedMarker>
                    <AdvancedMarker position={destinationCoordinate}>
                        <img src={destinationImg} className='h-8' alt="" />
                    </AdvancedMarker>
                </GoogleMap>
            </APIProvider>
        </div>
    );
};

export default MyMap;