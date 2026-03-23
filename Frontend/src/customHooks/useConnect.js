import { useState, useEffect, useRef } from "react"
import { getDriverDetails } from "../controller/request.js";
import { useLocation } from 'react-router-dom';
import { socket } from "../controller/socket.js";

export const useConnect = () => {
    const [connection, setconnection] = useState(false)
    const [trip, settrip] = useState({})
    const [farDriver, setfarDriver] = useState([])
    const [closeDriver, setcloseDriver] = useState([])
    const [time, setTime] = useState(0)
    const [reDirectTimer, setreDirectTimer] = useState(3)
    const [error, setError] = useState(null)
    let IntervalId;
    const location = useLocation()
    const timerRef = useRef()
    const reDirectTimerRef = useRef()

    async function Requester(data) {
        try {
            let response = await getDriverDetails(data)
            if (response && response.success) {
                setfarDriver(response.output.far)
                setfarDriver(response.output.close)
            } else {
                throw err
            }
        } catch (err) {
            setError('Something Went Wrong')
        }
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const d = query.get("data");
        const data = d ? JSON.parse(d) : null;
        console.log(data)
        settrip(data)
        socket.connect();
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        Requester(data)

        timerRef.current = setInterval(async () => {
            setTime(time + 1)
            if (time > 4 * 60) {
                setError('Request Time Out')
            }
            if (time % 10 == 0) {
                let response = await getDriverDetails(data)
                if (response && response.success) {
                    setfarDriver(response.output.far)
                    setcloseDriver(response.output.close)
                } else {
                    throw err
                }
            }
        }, 5000);

        return () => {
            socket.disconnect();
            clearInterval(timerRef.current)
        };
    }, [])

    useEffect(() => {
        if (!error) return;
        reDirectTimerRef.current = setInterval(() => {
            setreDirectTimer(reDirectTimer - 1)
            if (reDirectTimer == 0) {
                window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/home`
            }
        }, 1000);

        return () => {
            clearInterval(reDirectTimerRef.current)
        }
    }, [Error])
    return {
        trip, connection, farDriver, setfarDriver, closeDriver, setcloseDriver, reDirectTimer, error, setError
    }
}