import connection from "../confiq/connection.js";
import polyline from '@mapbox/polyline';

const polylineToLineString = (encoded) => {
    const coords = polyline.decode(encoded);
    console.log(coords);

    let toReturn = [];
    coords.forEach(([lat, lng]) => {
        toReturn.push(`${lng} ${lat}`);
    });

    return toReturn.join(", ");
};

export const insertIntoRider = async (Id, data) => {
    try {
        const lineString = `LINESTRING(${polylineToLineString(data.path)})`;
        const sourcePoint = `POINT(${data.source.lng} ${data.source.lat})`;
        const destPoint = `POINT(${data.destination.lng} ${data.destination.lat})`;
        const initialPathCovered = `LINESTRING(
  ${data.source.lng} ${data.source.lat},
  ${data.source.lng} ${data.source.lat}
)`;
        console.log(data)
        await connection.execute(`INSERT INTO rider(Id, sourceName, destinationName,path,pathCovered, polyLine,sourceCoordinate,destinationCoordinate, currentCoordinate,paired, paid, vehicalNo) VALUES (?, ?, ?,ST_GeomFromText(?, 4326),ST_GeomFromText(?, 4326), ?, ST_GeomFromText(?, 4326),ST_GeomFromText(?, 4326),ST_GeomFromText(?, 4326),?, ?, ?)`,
            [
                Id,
                data.source?.name ?? null,
                data.destination?.name ?? null,
                lineString,
                initialPathCovered,
                data.path ?? null,
                sourcePoint,
                destPoint,
                sourcePoint,
                0,
                (data.rideType == 0) ? 0 : 1,
                data.vehicleNo
            ]
        );

        console.log("Rider inserted successfully!");
    } catch (err) {
        console.log(err);
        throw err;
    }
};