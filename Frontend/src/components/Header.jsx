import React from 'react'
import headerImg from '/src/assets/header_img.png'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import group_profiles from '/src/assets/group_profiles.png'
const Header = () => {
    return (
        <div className='w-full mid-h-screen mt-20'>
            <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:py-8 py-16'>
                <div className='relative bg-gradient-to-r from-gray-200 to-gray-100 flex flex-col md:flex-row items-center gap-10 lg-gap-10 p-7 rounded-lg '>
                    {/*  left panel */}
                    <div className='w-full md:w-1/2'>
                        <h1 className='text-5xl md:text-3xl lg:text-4xl font-bold leading-relaxed  '>
                            Find Your best<span className='text-blue-500'> Doctor</span><br /> Near You
                        </h1>
                        <p className='text-xl flex items-center gap-4 mt-4'><img className='w-32 h-22' src={assets.group_profiles} />Book appoinment,view prescription
                            <br /> and manage your health condition</p>
                        <Link to='/search-doctors' className='md:w-1/2 flex items-center gap-3 bg-blue-400
                px-6 py-5 rounded-full border-2 border-blue-600 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-600
                 focus:outline-none transition duration-300 mt-6'>Book Appoinment<img className='text-gray-900' src={assets.arrow_icon} /></Link>
                    </div>

                    <div className='w-full md:w-1/2'>
                        <img src={headerImg} alt='Healthcare' className='w-full h-auto rounded-2xl shadow object-cover hover:scale-[1.02] transition-transform duration-300' />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header