import React from 'react'
import logo from '../assets/logo.png'
const login = () => {
    return (
        <div className='h-full w-full bg-primary-background text-primary-title flex flex-col items-center 
        justify-center px-5 py-5 gap-5'>
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
                    <input type="text" className='border-2 h-10 rounded-md w-full px-2' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div className='text-sm font-semibold h-5'>
                        Password*
                    </div>
                    <input type="text" className='border-2 h-10 rounded-md w-full px-2' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div className='text-sm font-semibold h-5'>
                        confirm Password*
                    </div>
                    <input type="text" className='border-2 h-10 rounded-md w-full px-2' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div className='text-sm font-semibold h-5'>
                    </div>
                    <button className='h-10 w-full bg-primary-button rounded-md text-primary-background font-semibold'>
                        Proceed
                    </button>
                </div>

            </div>
        </div>
    )
}

export default login