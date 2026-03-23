import connection from "../confiq/connection.js";

const ToCollege = async (data) => {
    try {
        const lat = data.source.lat;
        const lng = data.source.lng;
        const destinationName = data.destinationName;
        console.log('distance:', data.radius)
        const distance = data.radius || 450;

        const distanceDeg = distance / 111320;
        const distanceFar = 6000
        const userPoint = `POINT(${lng} ${lat})`;

        const farQuery = `
            SELECT
                id,
                sourceName,
                destinationName,
                sourceCoordinate,
                destinationCoordinate,
                currentCoordinate,
                polyline,
                paired,
                paid,
                vehicalNo
            FROM driver
            WHERE paired = 0
              AND destinationName = ?
              AND ST_Intersects(
                  ST_Buffer(ST_GeomFromText(?, 0), ?),
                  ST_GeomFromWKB(ST_AsBinary(path), 0)
              )
              AND (
                  pathCovered IS NULL OR
                  NOT ST_Intersects(
                      ST_Buffer(ST_GeomFromText(?, 0), ?),
                      ST_GeomFromWKB(ST_AsBinary(pathCovered), 0)
                  )
              )
              AND ST_Distance_Sphere(
                  currentCoordinate,
                  ST_GeomFromText(?, 4326)
              ) <= ?
            ORDER BY paid
            LIMIT 5
        `;

        const closeQuery = `
            SELECT
                id,
                sourceName,
                destinationName,
                sourceCoordinate,
                destinationCoordinate,
                currentCoordinate,
                polyline,
                paired,
                paid,
                vehicalNo,
                ST_Distance_Sphere(
                    currentCoordinate,
                    ST_GeomFromText(?, 4326)
                ) as distance
            FROM driver
            WHERE paired = 0
              AND destinationName = ?
              AND ST_Distance_Sphere(
                  currentCoordinate,
                  ST_GeomFromText(?, 4326)
              ) <= ?
            ORDER BY
                ST_Distance_Sphere(
                    currentCoordinate,
                    ST_GeomFromText(?, 4326)
                ) ASC,
                paid ASC
            LIMIT 5
        `;

        const [farDriver] = await connection.execute(farQuery, [
            destinationName,
            userPoint, distanceDeg,
            userPoint, distanceDeg,
            userPoint, distanceFar
        ]);

        const [closeDriver] = await connection.execute(closeQuery, [
            userPoint, destinationName,
            userPoint, distance,
            userPoint
        ]);

        const Drivers = {
            far: farDriver,
            close: closeDriver
        }
        console.log(Drivers)
        return Drivers;

    } catch (error) {
        console.error("Error fetching Drivers:", error);
        throw error;
    }
}

const fromCollege = async (data) => {
    try {
        const lat = data.source.lat;
        const lng = data.source.lng;
        const destinationName = data.destinationName;
        console.log('distance:', data.radius)
        const distance = data.radius || 450;

        const distanceDeg = distance / 111320;
        const distanceFar = 6000
        const userPoint = `POINT(${lng} ${lat})`;

        const Query = `
            SELECT
                id,
                sourceName,
                destinationName,
                sourceCoordinate,
                destinationCoordinate,
                currentCoordinate,
                polyline,
                paired,
                paid,
                vehicalNo
            FROM driver
            WHERE paired = 0
              AND sourceName = ?
              AND ST_Intersects(
                  ST_Buffer(ST_GeomFromText(?, 0), ?),
                  ST_GeomFromWKB(ST_AsBinary(path), 0)
              )
              AND ST_Distance_Sphere(
                  currentCoordinate,
                  ST_GeomFromText(?, 4326)
              ) < ?
            ORDER BY paid
            LIMIT 5
        `;
        const [farDriver] = await connection.execute(Query, [
            data.sourceName,
            userPoint, distanceDeg,
            userPoint, distance
        ]);

        const Drivers = {
            far: farDriver,
            close: []
        }
        console.log(Drivers)
        return Drivers;

    } catch (error) {
        console.error("Error fetching Drivers:", error);
        throw error;
    }
}

export const getAvailableDriver = async (data) => {
    try {
        let output
        if (data.destinationName == 'Medicaps University') {
            output = await ToCollege(data)
        } else {
            output = await fromCollege(data)
        }
        return {
            success: true,
            output: output,
            error: null
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            output: {},
            error: 'something went wrong'
        }
    }
};