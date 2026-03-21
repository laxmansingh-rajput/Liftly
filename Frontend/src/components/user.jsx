import React, { useEffect, useRef, useState } from 'react'
import { useDetails } from '../customHooks/useDetails'
import Loader from './loader'
import back from '../assets/back.svg'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import RangeMap from './rangeMap'

const user = () => {
    const [load, setload] = useState(true)
    const [next, setnext, details, setdetails] = useDetails('ride', setload)
    const [err, seterr] = useState(null)
    const [radius, setradius] = useState(450)
    const [pointData, setpointData] = useState({
        source: { lat: "", lng: "" },
        destination: { lat: "", lng: "" }

    })
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
        setpointData(() => {
            return {
                source: {
                    lat: parsed.source.lat,
                    lng: parsed.source.lng,
                },
                destination: {
                    lat: parsed.destination.lat,
                    lng: parsed.destination.lng,
                }
            }
        })
        setlocation(newLocation)
    }, [])

    return (
        <div>
            {
                load ? <Loader /> :
                    <div className='w-full flex flex-col items-center h-screen relative'>

                        <div className='border-2 h-2/3  w-full '>
                            <RangeMap source={pointData.source} destination={pointData.destination} radius={radius} />
                            <div
                                className='absolute bottom-2 left-2 flex items-center gap-2 cursor-pointer shadow-md 
                                    rounded-full px-1 py-0.5 border-2'
                                onClick={() => { window.location.href = 'http://localhost:5173/home' }}
                            >
                                <img src={back} className='h-5 ' alt="back" />
                            </div>
                        </div>

                        <div className='absolute bottom-0 left-0 bg-primary-background rounded-t-xl
                         h-1/3  w-full z-10 flex flex-col justify-around gap-2 p-3  '>

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

                            <div className='flex items-center justify-start text-primary-subtitle'>
                                <div className='w-1/3'>
                                    WALK RADIUS:
                                </div>
                                <div className='w-1/2 flex items-center justify-center gap-4 text-primary-title'>
                                    {
                                        (radius >= 250) && <img src={minus} className='h-5' onClick={() => { setradius(Math.max(radius - 25, 250)) }} alt="" />
                                    }
                                    <div>{radius}</div>
                                    {
                                        (radius <= 600) &&
                                        <img src={plus} className='h-5' onClick={() => { setradius(Math.min(radius + 25, 600)) }} alt="" />
                                    }
                                </div>
                            </div>

                            <div className=' flex items-center justify-center gap-3 relative  '>
                                {err && <div className="absolute -bottom-2 w-full text-center left-0 text-sm text-red-600 ">
                                    {err}
                                </div>}
                            </div>

                            <button
                                className='relative w-full p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium'
                            >
                                Proceed
                            </button>

                        </div>
                    </div>
            }
        </div>
    )
}

export default user