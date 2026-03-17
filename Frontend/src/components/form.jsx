import React from 'react'
import logo from '../assets/logo.png'
import { useEffect, useState } from 'react'
import { fetchDetails } from '../controller/clickHandler'
import { useDetails } from '../customHooks/useDetails'
import open from '../assets/open.svg'
import close from '../assets/close.svg'
import axios from 'axios'
import Loader from './loader'

const form = () => {
    const [load, setload] = useState(true)
    const [next, setnext, details, setdetails] = useDetails('form', setload)
    const [pass, setpass] = useState("")
    const [passtwo, setpasstwo] = useState("")
    const [error, seterror] = useState(null)
    const [hideOne, sethideOne] = useState(true)
    const [hideTwo, sethideTwo] = useState(true)
    const handelPassChange = (e) => {
        let a = e.target.value
        setpass(a)
    }
    const handelPassTwoChange = (e) => {
        let a = e.target.value
        setpasstwo(a)
    }
    const errorMaker = (message) => {
        setTimeout(() => {
            seterror('')
        }, 3000);
        seterror(message)
    }
    const handelNameChange = (e) => {
        setdetails({
            ...details,
            name: e.target.value
        })
    }

    const handelProceed = async () => {

        if (details.name === "" || pass === "" || passtwo === "") {
            errorMaker('Please enter all the fields')
            return
        }
        if (pass.length < 8) {
            errorMaker('Password must be of minimum 8 length')
            return
        }
        if (pass !== passtwo) {
            errorMaker('Passwords not matching')
            setpass("")
            setpasstwo("")
            return
        }
        const newDetails = {
            ...details,
            password: pass
        }
        setdetails(newDetails)
        const response = await axios.post(
            "http://localhost:3000/form",
            newDetails,
            { withCredentials: true }
        )
        if (response.data.success) {
            window.location.href = 'http://localhost:5173/phone';
        } else if (response.data.error && response.data.error == 'Cookies not found') {
            window.location.href = 'http://localhost:5173/';
        }
        console.log(response.data)
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
                                Set Password
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='text-sm font-semibold'>
                                    Name*
                                </div>
                                <input type="text" className='border-2 h-10 rounded-md w-full px-2' value={(details.name) ? details.name : ""}
                                    onChange={(e) => handelNameChange(e)} />
                            </div>
                            <div className='w-full flex flex-col gap-2 relative '>
                                <div className='text-sm font-semibold h-5'>
                                    Password*
                                </div>
                                <img src={hideOne ? open : close} className='h-6 absolute right-1.5 bottom-2 cursor-pointer select-none ' onClick={() => sethideOne(!hideOne)} alt="" />
                                <input type={(hideOne) ? "password" : "text"} className='border-2 h-10 rounded-md w-full px-2' value={pass}
                                    onChange={(e) => handelPassChange(e)} />
                            </div>
                            <div className='w-full flex flex-col gap-2 relative '>
                                <div className='text-sm font-semibold h-5'>
                                    Confirm Password*
                                </div>
                                <img src={hideTwo ? open : close} className='h-6 absolute right-1.5 bottom-2 cursor-pointer select-none '
                                    onClick={() => sethideTwo(!hideTwo)} alt="" />

                                <input type={(hideTwo) ? "password" : "text"} className='border-2 h-10 rounded-md w-full px-2' value={passtwo}
                                    onChange={(e) => handelPassTwoChange(e)} />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='text-sm font-semibold h-5 text-red-600 w-full text-center'>
                                    {error}
                                </div>
                                <button className='h-10 w-full bg-primary-button rounded-md text-primary-background font-semibold'
                                    onClick={() => handelProceed()}>
                                    Proceed
                                </button>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default form