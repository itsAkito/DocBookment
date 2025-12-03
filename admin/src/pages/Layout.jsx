import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 p-6 bg-gray-100'>
            <Outlet />
            </div>
        </div>
    )
}

export default Layout