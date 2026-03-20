import React, { useEffect, useState } from 'react';
import {
    APIProvider,
    Map as GoogleMap,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';

const DirectionsRenderer = ({ source, destination, setpath }) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !source || !destination) return;

        directionsService.route({
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
        }).then((response) => {
            directionsRenderer.setDirections(response);

            const route = response.routes[0];
            const leg = route.legs[0];
            const encodedPolyline = route.overview_polyline;
            setpath(encodedPolyline)
            console.log("Distance:", leg.distance.text);
            console.log("Time:", leg.duration.text);

        }).catch((e) => console.error("Directions request failed", e));

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, source, destination]);
    
    return null;
};

const MyMap = ({ location, path, setpath }) => {
    const source = location?.source;
    const destination = location?.destination;

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                <GoogleMap
                    defaultZoom={13}
                    defaultCenter={{
                        lat: source?.lat ?? 22.6210,
                        lng: source?.lng ?? 75.8036
                    }}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_Id}
                >
                    <DirectionsRenderer source={source} destination={destination} setpath={setpath} />
                </GoogleMap>
            </APIProvider>
        </div>
    );
};

export default MyMap;