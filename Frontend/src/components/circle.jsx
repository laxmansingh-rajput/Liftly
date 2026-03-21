import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

const CircleComponent = ({ center, radius }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !window.google) return;
        
        const circle = new window.google.maps.Circle({
            map,
            center,
            radius,
            fillColor: "#8F8F8F",
            fillOpacity: 0.3,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
        });

        return () => {
            circle.setMap(null);
        };
    }, [map, center, radius]);

    return null;
};

export default CircleComponent;