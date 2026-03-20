import React, { useEffect, useRef, useContext } from 'react';
import { pathContext } from '../customHooks/useContext.js';
import { useMap } from '@vis.gl/react-google-maps';

const RouterDrawer = ({ source, destination }) => {
    const { setpath, pathIndex, alterPaths, setalterPaths } = useContext(pathContext);
    const map = useMap();
    const polylineRef = useRef(null);

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
                    computeAlternativeRoutes: true
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

                setalterPaths(data.routes);

                const encodedPath = data.routes[0].polyline.encodedPolyline;
                setpath(encodedPath);

                const path = google.maps.geometry.encoding.decodePath(encodedPath);

                if (polylineRef.current) {
                    polylineRef.current.setMap(null);
                }

                const newPolyline = new google.maps.Polyline({
                    path,
                    geodesic: true,
                    strokeColor: '#4285F4',
                    strokeOpacity: 0.8,
                    strokeWeight: 6,
                    map,
                });

                polylineRef.current = newPolyline;
                const bounds = new google.maps.LatLngBounds();
                path.forEach(p => bounds.extend(p));
                map.fitBounds(bounds);
            } catch (err) {
                console.error(err);
            }
        };

        getRoute();

        return () => {
            if (polylineRef.current) {
                polylineRef.current.setMap(null);
            }
        };
    }, [map, source, destination]);

    useEffect(() => {
        if (!map || !alterPaths || !alterPaths[pathIndex]) return;

        const encodedPath = alterPaths[pathIndex].polyline.encodedPolyline;
        setpath(encodedPath);

        const path = google.maps.geometry.encoding.decodePath(encodedPath);

        if (polylineRef.current) {
            polylineRef.current.setMap(null);
        }

        const newPolyline = new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: '#4285F4',
            strokeOpacity: 0.8,
            strokeWeight: 6,
            map,
        });

        polylineRef.current = newPolyline;

    }, [pathIndex, alterPaths, map]);

    return null;
};

export default RouterDrawer;