export const getLocation = async () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return null;
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.error("Error getting location:", error.message);
                reject(error);
            }
        );
    });
};