import React from 'react'
import logo from '../assets/logo.png'
import house from '../assets/house.svg'
import hat from '../assets/hat.svg'

const Landing = () => {
    return (
        <div className='h-full w-full flex flex-col items-center bg-[#ffffff] py-8 px-5 text-[#1e293b]'>
            <div className='h-4/5 w-full  flex flex-col items-center gap-3'>
                <img className='h-35 select-none' src={logo} alt="" />
                <div className='w-full flex flex-col items-center justify-center gap-1'>
                    <div className='text-4xl font-bold'>
                        LiftLy
                    </div>
                    <div className='font-semibold text-[#94a3b8]'> SHARE YOUR COMMUTE</div>
                </div>
                <div className='border-2 h-25 w-full rounded-xl bg-[#f8faff] border-[#e2e8f0] 
                flex items-center justify-start p-4 gap-2'>
                    <div className=' h-full w-1/5 rounded-md bg-[#ecfdf5 ] flex items-center justify-center'>
                        <img src={house} className='h-9 select-none' alt="" />
                    </div>
                    <div className='w-4/5  h-full p-2'>
                        <div className='font-semibold text-xl'>
                            Go to College
                        </div>
                        <div className='text-sm text-[#94a3b8]'>
                            Ride heading to campus
                        </div>
                    </div>
                </div>
                <div className='border-2 h-25 w-full rounded-xl bg-[#f8faff] border-[#e2e8f0] 
                flex items-center justify-start p-4 gap-2'>
                    <div className=' h-full w-1/5 rounded-md bg-[#ecfdf5 ] flex items-center justify-center'>
                        <img src={hat} className='h-9 select-none' alt="" />
                    </div>
                    <div className='w-4/5  h-full p-2'>
                        <div className='font-semibold text-xl'>
                            Go to College
                        </div>
                        <div className='text-sm text-[#94a3b8]'>
                            Ride heading to campus
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-1/5 w-full flex flex-col items-center gap-3'>
                <div className='w-full flex gap-1 items-center justify center text-[#94a3b8]'>
                    <div className='border-1 w-3/7'>
                    </div>
                    <div className='w-2/7 flex items-center justify-center text-sm'>
                        JOIN WITH
                    </div>
                    <div className='border-1 w-3/7 '>
                    </div>
                </div>
                <div className='w-full h-15  p-2 rounded-xl bg-[#1e40af] text-[#ffff] flex items-center justify-center font-semibold text-2xl hover:bg-black cursor-pointer hover:scale-95 transition-all ease-in duration-100'>
                    Get Started
                </div>
                <div className='text-sm flex items-center justify-center gap-1'>
                    Already have an account?
                    <div className='font-semibold text-[#3b82f6] cursor-pointer '>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing