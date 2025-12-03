

import React, { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from 'react-router-dom'
import { assets } from "../assets/assets"
import { RiSettings4Line } from 'react-icons/ri'
import { DoctorContext } from "../context/DoctorContext"
const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const { dToken,doctor } = useContext(DoctorContext)
    
// console.log("Doctor context:", doctor);

    return (
        <div className='w-64 min-h-screen bg-gray-100 border-r'>
            {aToken && (
                <ul className="flex flex-col text-gray-800 mt-5">
                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer
              ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt='' />
                        <p className='text-gray-800 font-medium'>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => ` flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer 
               ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/add-doctor'}>
                        <img src={assets.add_icon} alt='' />
                        <p className='text-gray-800 font-medium'>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => ` flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer
                    ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/all-appointment'}>
                        <img src={assets.appointment_icon} alt='' />
                        <p className='text-gray-800 font-medium'>Appointment</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer
                      ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/doctorlist'}>
                        <img src={assets.people_icon} alt='' />
                        <p className='text-gray-800 font-medium'>DoctorLists</p>
                    </NavLink> <NavLink className={({ isActive }) => `flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer 
                          ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/setting'}>
                        <RiSettings4Line className='w-8 h-8' />
                        <p className='text-gray-800 font-medium'>Setting</p>
                    </NavLink>
                </ul>
            )}{dToken && (<ul className="flex flex-col text-gray-800 mt-5">
                <div className="flex flex-col items-center mb-5">
                <img src={doctor?.image} alt="Doctor"
                    className="w-32 h-32 bg-indigo-100 rounded-full object-cover" />
                    <span className=" text-center font-semibold text-gray-700">{doctor?.name}</span>
                    </div>
                <NavLink className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer
              ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/doctor-dashboard'}>
                    <img src={assets.home_icon} alt='' />
                    <p className='text-gray-800 font-medium'>Dashboard</p>
                </NavLink>
                <NavLink className={({ isActive }) => ` flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer
                    ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/doctor-appointments'}>
                    <img src={assets.appointment_icon} alt='' />
                    <p className='text-gray-800 font-medium'>Appointments</p>
                </NavLink>
                <NavLink className={({ isActive }) => ` flex items-center gap-4 px-4 py-3 md:px-8 md:min-w-64 cursor-pointer 
               ${isActive ? "bg-blue-100 border-r-4 border-blue-300" : ' '}`} to={'/doctor-profile'}>
                    <img src={assets.people_icon} alt='' />
                    <p className='text-gray-800 font-medium'>Profile</p>
                </NavLink>
            </ul>
            )}
        </div>
    )
}
export default Sidebar




