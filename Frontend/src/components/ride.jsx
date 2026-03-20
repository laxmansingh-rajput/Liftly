import React, { useEffect, useRef, useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import { insertMap } from '../controller/map'
import { sendRiderDetails } from '../controller/request'
import { usePath } from '../customHooks/usePath.js'
import Map from './map'
import back from '../assets/cross.svg'
import { pathContext } from '../customHooks/useContext'
const Ride = () => {
    const [load, setload] = useState(true)
    const [next, setnext, details, setdetails] = useDetails('ride', setload)
    const { path, setpath, alterPaths, setalterPaths, pathIndex, setpathIndex } = usePath()

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
    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className='h-full w-full bg-primary-background text-primary-title'>
            {
                load ? <Loader /> :
                    <div className='w-full flex flex-col items-center h-full relative'>

                        <div className='border-2 h-1/2  [@media(min-height:700px)]:h-[57vh] [@media(min-height:800px)]:h-[62vh] w-full relatice'>
                            <pathContext.Provider value={{
                                location, path, setpath, pathIndex, setpathIndex, alterPaths, setalterPaths
                            }}>
                                <Map />
                            </pathContext.Provider >
                            <div
                                className='absolute bottom-2 left-2 flex items-center gap-2 cursor-pointer shadow-md 
                                    rounded-full px-1 py-0.5 border-2'
                                onClick={() => { window.location.href = 'http://localhost:5173/rider' }}
                            >
                                <img src={back} className='h-5 ' alt="back" />
                            </div>
                        </div>

                        <div className='absolute bottom-0 left-0 bg-primary-background rounded-t-xl
                         h-[55vh]  [@media(min-height:700px)]:h-[45vh] [@media(min-height:800px)]:h-[40vh] w-full z-10 flex flex-col justify-around gap-2 p-3  '>

                            <div className='flex  items-center justify-center gap-3 '>
                                <div className=' p-2 border-2 bg-primary-card-background border-primary-card-border rounded-md
                                h-20 w-1/2 flex flex-col  items-start overflow-hidden justify-start gap-2'>
                                    <span className='text-sm text-primary-subtitle'>START </span>
                                    <div className='truncate font-medium'>
                                        {location.source.name || "Not selected"}
                                    </div>
                                </div>

                                <div className=' p-2 border-2 bg-primary-card-background border-primary-card-border rounded-md
                                h-20 w-1/2 flex flex-col  items-start overflow-hidden justify-start gap-2'>
                                    <span className='text-sm text-primary-subtitle'>END</span>
                                    <div className='truncate font-medium'>
                                        {location.destination.name || "Not selected"}
                                    </div>
                                </div>
                            </div>

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

                            <div className=' flex items-center justify-center gap-3   '>
                                <div className='flex flex-col items-start h-20 w-1/2 justify-start gap-2 '>
                                    <label className='text-sm text-primary-subtitle'>PATH</label>
                                    <div className='flex items-center justify-start gap-3 w-full'>
                                        {
                                            alterPaths.slice(0, 4).map((_, i) => (

                                                <button
                                                    key={i}
                                                    className={` p-2 cursor-pointer h-10 w-10 hover:scale-95  rounded-md border transition-all ease-in
                                                     duration-200 
                                                    ${i == pathIndex ? 'bg-primary-button text-white' : 'border-primary-title hover:bg-black/25 text-md '}`}
                                                    onClick={() => { setpathIndex(i) }}
                                                >
                                                    {`${i + 1}`}
                                                </button>
                                            ))
                                        }
                                    </div>

                                </div>

                                <div className='flex flex-col items-start h-20 w-1/2 justify-start gap-2'>
                                    <label className='text-sm text-primary-subtitle'>RIDE TYPE</label>
                                    <div className='flex gap-3 h-10  bg-primary-card-background border-2 border-primary-card-border
                                    w-full rounded-xl p-1 box-border'>
                                        <button
                                            onClick={() => handelPaid(true)}
                                            className={`flex-1  cursor-pointer hover:scale-95 rounded-md  transition-all ease-in
                                             duration-200 ${data.paid ? 'bg-primary-button text-white' : 'border-primary-title hover:bg-black/25'}`}
                                        >
                                            Paid
                                        </button>

                                        <button
                                            onClick={() => handelPaid(false)}
                                            className={`flex-1  cursor-pointer hover:scale-95  rounded-md  transition-all ease-in
                                             duration-200 ${!data.paid ? 'bg-primary-button text-white' : 'border-primary-title hover:bg-black/25'}`}
                                        >
                                            Free
                                        </button>
                                    </div>
                                    {err && <div className="absolute -bottom-5 w-full text-center left-0 text-sm text-red-600 ">
                                        {err}
                                    </div>}
                                </div>

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