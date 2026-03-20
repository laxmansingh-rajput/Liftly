import connection from "../confiq/connection.js";
import polyline from '@mapbox/polyline';

const polylineToLineString = (encoded) => {
    const coords = polyline.decode(encoded);
    console.log(coords);

    let toReturn = [];
    coords.forEach(([lat, lng]) => {
        toReturn.push(`${lng} ${lat}`); // swap lat/lng for MySQL
    });

    return toReturn.join(", "); // string ready for LINESTRING
};

export const insertIntoRider = async (Id, data) => {
    try {
        const lineString = `LINESTRING(${polylineToLineString(data.path)})`;
        const sourcePoint = `POINT(${data.source.lng} ${data.source.lat})`;
        const destPoint = `POINT(${data.destination.lng} ${data.destination.lat})`;
        
        await connection.execute(
            `INSERT INTO rider(Id, source, destination, path, source_location, destination_location,current_location)
             VALUES(?, ?, ?, ST_GeomFromText(?), ST_GeomFromText(?), ST_GeomFromText(?), ST_GeomFromText(?))`,
            [Id, data.source.name, data.destination.name, lineString, sourcePoint, destPoint, sourcePoint]
        );

        console.log("Rider inserted successfully!");
    } catch (err) {
        console.log(err);
        throw err;
    }
};