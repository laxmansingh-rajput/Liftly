const getPath = async (startLat, startlng, endLat, endLng) => {

    const bodyJson = {
        origin: {
            location: {
                latLng: {
                    latitude: startLat,
                    longitude: startlng
                }
            }
        },
        destination: {
            location: {
                latLng: {
                    latitude: endLat,
                    longitude: endLng
                }
            }
        },
        travelMode: "DRIVE",
        computeAlternativeRoutes: true
    }

    let output = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "AIzaSyBndk8WV-C4DvuItlb8b6-wsuLK34Nd1Ss",
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
        },
        body: JSON.stringify(bodyJson)
    })

    const data = await output.json();

    let encoded = data.routes[0].polyline.encodedPolyline;
    let path = google.maps.geometry.encoding.decodePath(encoded);

    return new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#4285F4",
        strokeOpacity: 1,
        strokeWeight: 5
    });
}

export const insertMap = async (mapElement, startLat, startlng, endLat, endLng) => {
    try {
        if (!mapElement) return

        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        let position = { lat: startLat, lng: startlng }

        let map = new Map(mapElement, {
            zoom: 12,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        new AdvancedMarkerElement({
            map: map,
            position: position,
        });

        let routeLine = await getPath(startLat, startlng, endLat, endLng);
        routeLine.setMap(map);

    } catch (err) {
        console.log(err)
    }

};