export const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
        );
        return location
    } else {
        alert("Geolocation is not supported by this browser.");
        return null
    }
}