import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import house from '../assets/house.svg'
import hat from '../assets/hat.svg'
import { goTo, google } from '../controller/clickHandler'
import { useEffect, useState } from 'react'
import { fetchDetails } from '../controller/clickHandler'
import { useDetails } from '../customHooks/useDetails'

import axios from "axios";

const Landing = () => {
    const navigate = useNavigate()
    const [next, setnext, details, setdetails] = useDetails('landing')
   
    return (
        <div className='h-full w-full flex flex-col items-center bg-primary-background py-8 px-5 text-primary-title'>
            <div className='h-4/5 w-full  flex flex-col items-center gap-3'>
                <img className='h-35 select-none' src={logo} alt="" />
                <div className='w-full flex flex-col items-center justify-center gap-1'>
                    <div className='text-4xl font-bold'>
                        LiftLy
                    </div>
                    <div className='font-semibold text-primary-subtitle'> SHARE YOUR COMMUTE</div>
                </div>
                <div className='border-2 h-25 w-full rounded-xl bg-primary-card-background border-primary-card-border 
                flex items-center justify-start p-4 gap-2'>
                    <div className=' h-full w-1/5 rounded-md bg-[#ecfdf5 ] flex items-center justify-center'>
                        <img src={house} className='h-9 select-none' alt="" />
                    </div>
                    <div className='w-4/5  h-full p-2'>
                        <div className='font-semibold text-xl'>
                            Go to College
                        </div>
                        <div className='text-sm text-primary-subtitle'>
                            Ride heading to campus
                        </div>
                    </div>
                </div>
                <div className='border-2 h-25 w-full rounded-xl bg-primary-card-background border-primary-card-border 
                flex items-center justify-start p-4 gap-2'>
                    <div className=' h-full w-1/5 rounded-md bg-[#ecfdf5 ] flex items-center justify-center'>
                        <img src={hat} className='h-9 select-none' alt="" />
                    </div>
                    <div className='w-4/5  h-full p-2'>
                        <div className='font-semibold text-xl'>
                            Go to College
                        </div>
                        <div className='text-sm text-primary-subtitle'>
                            Ride heading to campus
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-1/5 w-full flex flex-col items-center gap-3'>
                <div className='w-full flex gap-1 items-center justify center text-primary-subtitle '>
                    <div className='border-2 w-3/7'>
                    </div>
                    <div className='w-2/7 flex items-center justify-center text-sm'>
                        JOIN WITH
                    </div>
                    <div className='border-2 w-3/7 '>
                    </div>
                </div>
                <div className='w-full h-15  p-2 rounded-xl bg-primary-button text-[#ffff] flex items-center justify-center font-semibold text-2xl hover:bg-black cursor-pointer hover:scale-95 transition-all ease-in duration-100'
                    onClick={() => google(next)}
                >
                    Get Started
                </div>
                <div className='text-sm flex items-center justify-center gap-1'>
                    Already have an account?
                    <div className='font-semibold text-primary-link cursor-pointer'
                        onClick={() => goTo(navigate, 'login')}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing