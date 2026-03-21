import React, { useEffect } from 'react'
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import sourceImg from '../assets/source.svg'
import destinationImg from '../assets/destination.svg'
import cross from '../assets/back.svg'
import CircleComponent from './circle';
import { useNavigate } from 'react-router-dom';

const CalculateDistance = ({ source, destination, setDistance }) => {
    const map = useMap();
    useEffect(() => {
        if (!map || !source?.lat || !destination?.lat) return;

        const getRoute = async () => {
            try {
                const request = {
                    origin: {
                        location: {
                            latLng: {
                                latitude: Number(source.lat),
                                longitude: Number(source.lng)
                            }
                        }
                    },
                    destination: {
                        location: {
                            latLng: {
                                latitude: Number(destination.lat),
                                longitude: Number(destination.lng)
                            }
                        }
                    },
                    travelMode: 'DRIVE',
                };

                const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_KEY,
                        'X-Goog-FieldMask': 'routes.polyline.encodedPolyline,routes.distanceMeters,routes.duration'
                    },
                    body: JSON.stringify(request)
                });

                const data = await res.json();
                if (!data.routes?.length) return;

                setDistance(data.routes[0].distanceMeters);

            } catch (err) {
                console.error(err);
            }
        };

        getRoute();

    }, [map, source, destination]);
}
const RangeMap = ({ source, destination, radius, setDistance, location }) => {
    const navigate = useNavigate()
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
                        <CircleComponent radius={radius} center={location.source.name == 'Medicaps University' ? destination : source} location={location} />
                        <CalculateDistance source={source} destination={destination} setDistance={setDistance} />
                        <AdvancedMarker position={destination}>
                            <img src={destinationImg} className='w-10' alt="" />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>

                <div className='rounded-full absolute p-2 bottom-2 left-2 bg-primary-background' onClick={() => { navigate('/home') }}>
                    <img src={cross} className='h-6' alt="" />
                </div>
            </div>


        </div>
    )
}

export default RangeMap;