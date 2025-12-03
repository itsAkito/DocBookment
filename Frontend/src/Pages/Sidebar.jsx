import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RiUserLine, RiCalendarCheckLine, RiCloseLine, RiDashboardLine, RiLogoutBoxLine, RiSettings4Line, RiFileList2Line } from 'react-icons/ri'
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
const Sidebar = () => {
    const { token, setToken } = useAppContext()
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        setToken(null)
        setIsLoggedIn(false)
    }
    if (!token)
        return null
    return (
        <div>
            {isSidebarOpen && (
                <div
                    className={`fixed right-0 top-0 h-screen w-64 bg-indigo-200 text-gray-800 shadow-lg 
        transform transition-transform duration-300 ease-in-out 
        ${token ? 'translate-x-0' : 'translate-x-[26rem]'} z-40`}
                >
                    <div className='flex justify-between items-center p-4'>
                        <span className="font-semibold text-lg">Welcome</span>
                        <button onClick={() => setIsSidebarOpen(false)}>
                            <RiCloseLine className="text-2xl hover:text-red-600" />
                        </button>
                    </div>
                    <div className='p-4 mt-4'>
                        <nav className='space-y-4'>
                            <NavLink to='/profile' className='flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors'>
                                <RiUserLine className='text-xl' />
                                <span className='ml-2'>Profile</span>
                            </NavLink>

                            <NavLink to='/my-appointment' className='flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors'>
                                <RiCalendarCheckLine className='text-xl' />
                                <span className='ml-2'>Book Appointment</span>
                            </NavLink>

                            <NavLink to='/patientdashboard' className='flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors'>
                                <RiDashboardLine className='text-xl' />
                                <span className='ml-2'>Patient Dashboard</span>
                            </NavLink>

                            <NavLink to='/prescriptionviewer' className='flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors'>
                                <RiFileList2Line className='text-xl' />
                                <span className='ml-2'>Prescriptions</span>
                            </NavLink>

                            <NavLink to='/setting' className='flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors'>
                                <RiSettings4Line className='text-xl' />
                                <span className='ml-2'>Settings</span>
                            </NavLink>

                            <button onClick={handleLogout} className='flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors'>
                                <RiLogoutBoxLine className='text-xl' />
                                <span className='ml-2'>Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Sidebar