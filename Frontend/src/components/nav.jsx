import React from 'react'
import { useNavigate } from 'react-router-dom';
import book from '../assets/book.png'
import start from '../assets/start.png'
import profile from '../assets/profile.png'

const Nav = () => {
    const navigate = useNavigate();

    return (
        <div className='absolute bottom-0 left-0 h-12 w-full flex items-center justify-around p-2 border-t-2 rounded-t-md  
        bg-primary-background border-primary-button z-50'>

            <div className='flex flex-col items-center justify-center'>
                <img
                    src={book}
                    className='h-8 cursor-pointer'
                    onClick={() => navigate('/home')}
                    alt="home"
                />
            </div>

            <div className='flex flex-col items-center justify-center'>
                <img
                    src={start}
                    className='h-9 cursor-pointer'
                    onClick={() => navigate('/rider')}
                    alt="rider"
                />
            </div>

            <div className='flex flex-col items-center justify-center'>
                <img
                    src={profile}
                    className='h-9 cursor-pointer'
                    onClick={() => navigate('/profile')}
                    alt="profile"
                />
            </div>

        </div>
    )
}

export default Nav;