import axios from "axios";

export const sendLoginDetails = async (data) => {
  try {
    let response = await axios.post('http://localhost:3000/auth/login', data,
      {
        Credential: true
      })
    return response.data
  } catch {
    return null
  }
}
export const getCoordinates = async (placeId) => {
  try {
    const { Place } = await google.maps.importLibrary("places");

    const place = new Place({
      id: placeId,
    });

    await place.fetchFields({
      fields: ["location"],
    });

    if (!place.location) {
      throw new Error("No location found");
    }

    return {
      lat: place.location.lat(),
      lng: place.location.lng(),
    };

  } catch (error) {
    console.error("Coordinate Fetch Error:", error);
    throw error;
  }
};