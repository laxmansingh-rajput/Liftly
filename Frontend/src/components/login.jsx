import React from 'react'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import open from '../assets/open.svg'
import close from '../assets/close.svg'
import axios from 'axios'
import Loader from './loader'
import { useDetails } from '../customHooks/useDetails'
import { sendLoginDetails } from '../controller/request'
import { google } from '../controller/clickHandler'
const login = () => {
    const [load, setload] = useState(false)
    const [error, seterror] = useState(null)
    const [hideOne, sethideOne] = useState(true)
    const [data, setdata] = useState({ email: "", password: "" })
    const [next, setnext, details, setdetails] = useDetails('login', setload)

    const handelPassChange = (e) => {
        setdata({
            ...data,
            password: e.target.value
        })
    }
    const errorMaker = (message) => {
        setTimeout(() => {
            seterror('')
        }, 3000);
        seterror(message)
    }
    const handelEmailChange = (e) => {
        setdata({
            ...data,
            email: e.target.value
        })
    }
    const handelProceed = async () => {
        if (data.email.length == 0 || data.password.length == 0) {
            errorMaker('Enter the fields')
        } else {
            let s = data.email
            let arr = s.split('@', 2)
            let email = arr[0] + '@medicaps.ac.in'
            email = email.toLowerCase()
            let newData = data;
            newData.email = email;
            setdata(newData)
            let response = await sendLoginDetails(data)
            if (response == null) {
                errorMaker('Server Problem')
            } else {
                if (response.success) {
                    window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/home`
                } else {
                    errorMaker(response.message)
                }
            }
        }
    }
    return (
        <div className='h-full w-full bg-primary-background text-primary-title flex flex-col items-center 
        justify-center px-5 py-5 gap-5 relative'>
            {
                (load) ? <Loader />
                    : <div className='h-full w-full flex flex-col items-center 
        justify-center gap-5'>
                        <div className='flex  items-center justify-center gap-3 w-full'>
                            <img className='h-20 select-none' src={logo} alt="" />
                            <div className=' flex flex-col items-center justify-center gap-2'>
                                <div className='text-4xl font-bold'>
                                    LiftLy
                                </div>
                                <div className='font-semibold text-primary-subtitle'> SHARE YOUR COMMUTE</div>
                            </div>
                        </div>
                        <div className='w-full h-5/7 border-2 rounded-xl bg-primary-card-background border-primary-card-border
            flex flex-col gap-4 p-5'>
                            <div className='text-xl font-bold w-full text-center mb-3'>
                                Login
                            </div>
                            <div className='w-full flex flex-col gap-2 relative'>
                                <div className='text-sm font-semibold'>
                                    Email*
                                </div>
                                <div className='absolute text-[12px] text-primary-subtitle right-0 bottom-0 p-1 border-box flex items-center justify-center
                                 bg-primary-card-background h-10 border-r-2 border-t-2 border-b-2 border-black rounded-r-md'>
                                    @medicaps.ac.in
                                </div>
                                <input type="text" className='border-2 h-10 rounded-md w-full px-2'
                                    value={data.email}
                                    onChange={(e) => handelEmailChange(e)} />
                            </div>
                            <div className='w-full flex flex-col gap-2 relative '>
                                <div className='text-sm font-semibold h-5'>
                                    Password*
                                </div>
                                <img src={hideOne ? open : close} className='h-6 absolute right-1.5 bottom-2 cursor-pointer select-none ' onClick={() => sethideOne(!hideOne)} alt="" />
                                <input type={(hideOne) ? "password" : "text"} className='border-2 h-10 rounded-md w-full px-2' value={data.password}
                                    onChange={(e) => handelPassChange(e)} />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='text-sm font-semibold h-5 text-red-600 w-full text-center'>
                                    {error}
                                </div>
                                <button className='h-10 w-full bg-primary-button rounded-md text-primary-background font-semibold hover:bg-black cursor-pointer hover:scale-95 transition-all ease-in duration-100'
                                    onClick={() => handelProceed()}>
                                    Proceed
                                </button>
                            </div>
                            <div className='w-full h-10  p-2 rounded-md bg-primary-button text-[#ffff] flex items-center justify-center font-semibold text-md hover:bg-black cursor-pointer hover:scale-95 transition-all ease-in duration-100'
                                onClick={() => google(next)}
                            >
                                Login with Google
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default login