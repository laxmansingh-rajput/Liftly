import axios from "axios";

export const sendLoginDetails = async (data) => {
  try {
    let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data,
      {
        withCredentials: true
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

export const sendDriverDetails = async (data) => {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/feed/Driver-details`,
      data,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDriverDetails = async (data) => {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/`,
      data,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
