import React, { useEffect, useRef, useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import { insertMap } from '../controller/map'
import { sendRiderDetails } from '../controller/request'
import Map from './map'
import back from '../assets/cross.svg'


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
        const parsed = JSON.parse(raw);
        const newLocation = {
            source: {
                lat: parsed.source.lat,
                lng: parsed.source.lng,
                name: s
            },
            destination: {
                lat: parsed.destination.lat,
                lng: parsed.destination.lng,
                name: d
            }
        }

        setlocation(newLocation)
    }, [])

    const [err, seterr] = useState(null)

    const generateError = (message) => {
        setTimeout(() => {
            seterr(null)
        }, 3000);
        seterr(message)
    }

    const handleProceed = async () => {
        if (data.vehicleNo.length == 0) {
            generateError('Enter Vehical No')
        }
        else if (path.length == 0) {
            generateError('Wait to find Path')
        } else {
            const finalJSON = {
                source: location.source,
                destination: location.destination,
                vehicleNo: data.vehicleNo,
                rideType: data.paid ? "paid" : "free",
                path: path,
            }
            let responce = await sendRiderDetails(finalJSON)
            if (responce.success) {
                window.location.href = "http://localhost:5173/searchUser"
            } else {
                generateError('something went wrong')
            }
        }
    }

    return (
        <div className='h-full w-full bg-primary-background text-primary-title'>
            {
                load ? <Loader /> :
                    <div className='w-full flex flex-col items-center h-full relative'>

                        <div className='border-2 h-1/2 w-full '>
                            <Map location={location} path={path} setpath={setpath} />
                        </div>

                        <div className='absolute bottom-0 left-0 bg-primary-background 
                        rounded-t-md h-6/10 w-full z-10 flex flex-col justify-between gap-5 p-2'>

                            <div className='space-y-3 relative'>
                                <div
                                    className='absolute top-0 right-2 flex items-center gap-2 cursor-pointer shadow-md 
                                    rounded-full px-1 py-0.5 border-2'
                                    onClick={() => { window.location.href = 'http://localhost:5173/rider' }}
                                >
                                    <img src={back} className='h-5 ' alt="back" />
                                </div>
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

                            <div className='relative'>
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
                                {err && <div className="absolute -bottom-5 w-full text-center left-0 text-sm text-red-600 ">
                                    {err}
                                </div>}
                            </div>

                            <button
                                onClick={() => handleProceed()}
                                className='relative w-full p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium'
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