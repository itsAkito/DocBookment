import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-gray-200 rounded-lg mt-2 '>
            <div className='container mx-auto py-2 px-4 '>
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className=' space-y-5'>
                        <img src={assets.Medical} alt='Logo' className='h-12 w-auto' />
                        <p className='font-medium'>Your trusted healthcare platform connecting patients with our qualified medical professionals. </p>
                        <div className='flex space-x-5'>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 
                                    3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 
                                    2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 
                                    2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    {/* Quick Link */}
                    <div>
                        <h3 className='text-lg font-semibold mb-5'>Quick Link</h3>
                        <ul>
                            <li>
                                <Link to='/' className=' hover:text-blue-500 transition-colors'>Home</Link>
                            </li>
                            <li>
                                <Link to='/about' className=' hover:text-blue-500 transition-colors'>About Us</Link>
                            </li>
                            <li>
                                <Link to='/search-doctors' className=' hover:text-blue-500 transition-colors'>Find Doctors</Link>
                            </li>
                            <li>
                                <Link to='/contact' className=' hover:text-blue-500 transition-colors'>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    {/* services */}
                    <div>
                        <h3 className='text-lg font-semibold mb-5'>Our Services</h3>
                        <ul className='space-y-2'>
                            {['General Physician', 'Pediatritician', 'Dematologist', 'Gynecologist'].map((service) => (
                                <li key={service}>
                                    <Link to='/search-doctors' className='hover:text-blue-400 transition duration-colors'>
                                        {service}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* contact info */}
                    <div>
                        <h3 className='text-lg font-medium mb-4'>
                            Contact Us
                        </h3>
                        <ul className='space-y-2'>
                            <li className=' flex items-center space-x-2'>
                                <svg className='h-5 w-5 ' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='join' strokeWidth='2'
                                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
                                        </path>
                                    </path>
                                </svg>
                                <span> XXX Medical Street, City, Country</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                                <svg className='h-6 w-6' fill='none' stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@medicalhub.com" className="hover:text-blue-400 transition-colors">
                                    info@medicalhub.com
                                </a>
                            </li>
                            <li className='flex items-center space-x-2'>
                                <svg className='h-6 w-6' fill='none' stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+91 123456789" className="hover:text-blue-400 transition-colors">
                                    +91 1234567890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-blue-800 mt-12 pt-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p className='text-sm'>
                            © {new Date().getFullYear()} Medical Hub. All rights reserved.
                        </p>
                        <div className='flex space-x-6 mt-6 md:mt-0'>
                            <Link className='text-sm hover:text-blue-500 transition-colors'>
                                Privacy Policy </Link>
                            <Link className=' text-sm hover:text-blue-500 transition-colors'>
                                Terms of Services</Link>
                        </div>
                    </div>
                </div>
            </div>

        </footer >
    )
}

export default Footer