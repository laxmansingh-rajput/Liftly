import React, { useEffect, useRef, useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import { insertMap } from '../controller/map'
import Map from './map'

const Ride = () => {
    const [load, setload] = useState(true)
    const [next, setnext, details, setdetails] = useDetails('ride', setload)
    const [path, setpath] = useState("")
    const mapRef = useRef(null)
    useEffect(() => {
        console.log('pathChange', path)
    }, [path])

    const [data, setdata] = useState({
        source: '',
        destination: '',
        path: '',
        vehicleNo: '',
        paid: true
    })

    const handelPaid = (check) => {
        setdata(prev => ({
            ...prev,
            paid: check
        }))
    }

    const handelNo = (e) => {
        setdata(prev => ({
            ...prev,
            vehicleNo: e.target.value
        }))
    }

    const [location, setlocation] = useState({
        source: { lat: "", lng: "", name: "" },
        destination: { lat: "", lng: "", name: "" }
    })

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get("data");
        const s = params.get("source")
        const d = params.get("destination")

        if (!raw) return

        const parsed = JSON.parse(decodeURIComponent(raw));
        const source = JSON.parse(parsed.source);
        const destination = JSON.parse(parsed.destination);

        const newLocation = {
            source: {
                lat: source.lat,
                lng: source.lng,
                name: s
            },
            destination: {
                lat: destination.lat,
                lng: destination.lng,
                name: d
            }
        }

        setlocation(newLocation)
    }, [])

    // useEffect(() => {
    //     if (
    //         mapRef.current &&
    //         location.source.lat &&
    //         location.destination.lat
    //     ) {
    //         insertMap(
    //             mapRef.current,
    //             location.source.lat,
    //             location.source.lng,
    //             location.destination.lat,
    //             location.destination.lng
    //         )
    //     }
    // }, [location])

    const generateError = (message) => {

    }

    const handleProceed = () => {
        if (data.vehicleNo.length == 0) {
            generateError('Enter Vehical No')
        }
        const finalJSON = {
            source: location.source,
            destination: location.destination,
            vehicleNo: data.vehicleNo,
            rideType: data.paid ? "paid" : "free",
            path: path,
        }

        console.log("FINAL JSON:", finalJSON)
    }

    return (
        <div className='h-full w-full bg-primary-background text-primary-title'>
            {
                load ? <Loader /> :
                    <div className='w-full flex flex-col items-center h-full relative'>

                        <div className='border-2 h-1/2 w-full'>
                            <Map location={location} path={path} setpath={setpath} />
                        </div>

                        <div className='absolute bottom-0 left-0 bg-primary-card-background rounded-t-md h-6/10 w-full z-10 flex flex-col justify-between gap-4 p-4'>

                            <div className='space-y-3'>
                                <div>
                                    <span className='text-sm text-primary-subtitle'>Pickup Location</span>
                                    <div className='truncate font-medium'>
                                        {location.source.name || "Not selected"}
                                    </div>
                                </div>

                                <div>
                                    <span className='text-sm text-primary-subtitle'>Drop Location</span>
                                    <div className='truncate font-medium'>
                                        {location.destination.name || "Not selected"}
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle */}
                            <div>
                                <label className='text-sm text-primary-subtitle'>Vehicle Number*</label>
                                <input
                                    type='text'
                                    placeholder='Enter your vehicle number'
                                    value={data.vehicleNo}
                                    onChange={(e) => handelNo(e)}
                                    className='w-full mt-1 p-2 rounded-md bg-primary-background border border-primary-title focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                                />
                            </div>

                            {/* Ride Type */}
                            <div>
                                <label className='text-sm text-primary-subtitle'>Ride Preference</label>

                                <div className='flex gap-3 mt-2'>
                                    <button
                                        onClick={() => handelPaid(true)}
                                        className={`flex-1 p-2 rounded-md border transition ${data.paid ? 'bg-primary-button text-white' : 'border-primary-title hover:bg-gray-700'}`}
                                    >
                                        Offer Ride (Earn)
                                    </button>

                                    <button
                                        onClick={() => handelPaid(false)}
                                        className={`flex-1 p-2 rounded-md border transition ${!data.paid ? 'bg-primary-button text-white' : 'border-primary-title hover:bg-gray-700'}`}
                                    >
                                        Offer Ride (Free / Social)
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => handleProceed()}
                                className='w-full p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium'
                            >
                                Proceed
                            </button>

                        </div>
                    </div>
            }
        </div >
    )
}

export default Ride