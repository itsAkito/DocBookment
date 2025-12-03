import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
const Banner = () => {
    return (
        <div className='relative bg-gradient-to-r  rounded-lg  from-blue-300 to-blue-100'>
            <div className='container mx-auto px-4 sm:px-4 lg:px-7 py-11 sm:py-15'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-7 items-center'>
                    {/* left panel */}
                    <div className='text-center lg:text-left'>
                        <h1 className='sm:text-5xl lg:text-5xl font-bold  text-4xl mb-6 '>
                            Book Your Appointment with <span className='text-blue-700'>Doctor</span>
                        </h1>
                        <p className='font-bold text-gray-800 mb-6'> Get the best healthcare exprience with our trustes medical professionals.<br />
                            Book appointments instantly and manage your health easily.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-5 justify-center lg:justify-start' >

                            <Link to='/search-doctors' className='bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-200 border-2  border-blue-600 transition duration-400  text-lg font-medium' >
                                Find Doctors
                            </Link>
                            <Link to='/about' className='bg-blue-600 text-white px-8 py-4 rounded-full border-2 hover:bg-blue-200 border-blue-600 transition duration-400  text-lg font-medium' >
                                Learn More
                            </Link>

                        </div>
                        {/* state section */}
                        <div className='grid grid-cols-3 gap-4 mt-13 text-center'>
                            <div className=' p-4 rounded-lg shadow-sm  border-2 border-blue-400 hover:bg-blue-400 transition duration-200 cursor-pointer'>
                                <h3 className='font-semibold text-blue-600 text-3xl'>200+</h3>
                                <p className='font-semibold text-gray-700 text-3xl sm:text-bold'>Doctors</p>
                            </div>
                            <div className=' p-4 rounded-lg shadow-sm  border-2 border-blue-400  hover:bg-blue-400 transition duration-200 cursor-pointer'>
                                <h3 className='font-semibold text-blue-600 text-3xl'>1000+</h3>
                                <p className='font-semibold text-gray-700 text-3xl  text-center sm:text-bold'>Patients</p>
                            </div>
                            <div className=' w-auto sm:w-auto p-4 rounded-lg shadow-sm  border-2 border-blue-400 hover:bg-blue-400 transition duration-200 cursor-pointer'>
                                <h3 className='font-semibold text-blue-600 text-3xl'>24/7</h3>
                                <p className='font-semibold text-gray-700 text-3xl sm:text-bold'>Support</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Image panel */}
                    <div>
                        <img src={assets.header_img}
                            alt='Healthcare'
                            className='w-full h-ful mb-40' />
                        <div className='absolute bottom-4 right bg-blue-100 flex flex-col lg:flex-row items-center justify-center p-4 rounded-lg shadow-lg max-w-xs ml-15 mb-15 hidden:sm:block'>
                            <div className=' flex items-center gap-4'>
                                <img src={assets.verified_icon}
                                    alt='Verified'
                                    className='w-10 h-10 ' />
                                <div className='text-left'>
                                    <p className='text-sm font-semibold'> Verified Doctors</p>
                                    <p className='text-sm font-semibold'>
                                        100% Verified Medical Professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 -z-10">
                <svg
                    width="404"
                    height="384"
                    fill="none"
                    viewBox="0 0 404 384"
                    className="opacity-20"
                >
                    <defs>
                        <pattern
                            id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect
                                x="0"
                                y="0"
                                width="4"
                                height="4"
                                className="text-blue-200"
                                fill="currentColor"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="404"
                        height="384"
                        fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Banner