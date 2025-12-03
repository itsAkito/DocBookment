import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
// import PrescriptionViewer from './PrescriptionViewer.jsx'
import { AppContext, useAppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const {userData}=useAppContext()
    const navigate = useNavigate();
    // const [showmMenu,serShowMenu] = useState(false)
    // const[token,setToken]=useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const { token, setToken } = useAppContext(AppContext)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(false)
        navigate('/')
    }
    return (
        <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-blue-200'}`}>
            <div className={`${isScrolled ? 'bg-white' : 'bg-gray-300'} h-16 w-full flex items-center justify-between  px-6 md:px-12`}>
                <div className='flex-shrink-0'>
                    <img src={assets.Medical} alt="Medical Logo" style={{ width: '160px' }} />
                </div>
                <ul className=' flex-1 hidden md:flex justify-center gap-8 '>
                    <li>
                        <NavLink to='/' end
                            className={({ isActive }) => `text-sm hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                                }`
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/search-doctors' className={({ isActive }) => `text-sm hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                            }`
                        }>
                            Search Doctors
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to='/about' className={({ isActive }) => `text-sm hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                            }`
                        }>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className={({ isActive }) => `text-sm hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                            }`}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <div >
                    {!token && userData? (
                        <button
                            onClick={() => navigate('/login')}
                            className='text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer'
                        >
                            Create Account
                        </button>
                    ) : (
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img
                                src={userData?.image}
                                alt=''
                                className='w-10 h-10 rounded-full object-cover'
                            />
                            <img src={assets.dropdown_icon} alt='dropdown' />
                            <div className='absolute top-0 right-0 pt-10 text-base font-medium text-gray-800 z-20 hidden group-hover:block'>
                                <div className='min-h-48 bg-indigo-200 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/profile')} className='hover:text-gray-700 cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointment')} className='hover:text-gray-700 cursor-pointer'>My Appointment</p>
                                    <p onClick={() => navigate('/prescriptionviewer')} className='hover:text-gray-700 cursor-pointer'>My Prescriptions</p>
                                    <p onClick={() => navigate('/setting')} className='hover:text-gray-700 cursor-pointer'>Setting</p>
                                    <p onClick={handleLogout} className='hover:text-gray-700 cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar