import React, { useContext, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import moment from 'moment'
import { RiSearchLine } from 'react-icons/ri'
const Dashboard = () => {
  const { totalAppointments, uniquePatients, latestAppointments } = useContext(DoctorContext)
  const [query, setQuery] = useState("")
  const handleSearch = (e) => {
    setQuery(e.target.value)
  }
  return (
    <div className='p-7'>
      <div className='flex flex-wrap gap-8 justify-between '>
        <p className='text-gray-800 text-xl font-bold mb-5'>Overview</p>
        <div className=' flex items-center border border-gray-300 rounded-md px-3 py-1 w-72 bg-gray-100 mb-4'>
          <RiSearchLine className='text-gray-500 mr-2' />
          <input type='text' placeholder='Search By Patients' value={query}
            onChange={handleSearch}
            className='text-gray-700 outline-none  text-sm placeholder-gray-500' />
        </div>
      </div>
      <div className=' flex flex-wrap gap-8 justify-between mb-5'>

        <div className='flex-1 min-w-[250] bg-gray-200 p-4 hover:bg-gray-300 hover:shadow-md rounded-lg shadow-lg transition-all duration-200 hover:scale-105'>
          <h2 className='text-lg font-semibold text-gray-800'>Appointment</h2>
          <img src={assets.appointments_icon} alt='doctor icon' className=' border-b border-gray-200 shadow rounded-lg mt-5 ' />
          <p className='text-gray-700 justify-center '>{totalAppointments}</p>
        </div>
        <div className='flex-1 min-w-[250] bg-gray-200 p-4 hover:bg-gray-300 hover:shadow-md rounded-lg shadow-lg transition-all duration-200 hover:scale-105'>
          <h2 className='text-lg font-semibold text-gray-800'>Patient</h2>
          <img src={assets.patients_icon} alt='doctor icon' className=' border-b border-gray-200 shadow rounded-lg mt-5' />
          <p className='text-gray-700 '>{uniquePatients}</p>
        </div>
      </div>
      <div className='grid lg:grid-cols-6 gap-4 px-6 py-4 bg-gray-200 hover:bg-gray-300 shadow border-b border-gray-200'>
        <p>#</p>
        <p>Patient</p>
        <p>Status</p>
        <p>Date </p>
        <p>Action</p>
      </div>

      {latestAppointments
        .filter((appt) => appt.userId.name.toLowerCase().includes(query.toLowerCase()))
        .map((appt, index) => (
          <div key={appt._id} className='grid grid-cols lg:grid-cols-6 gap-5 px-6 py-4 items-center border-b border-gray-200 hover:bg-gray-50'>
            <p>{index + 1}</p>

            <div className='flex items-center gap-3'>
              <img
                src={appt.userId?.image}
                alt={appt.userId?.name}
                className='w-12 h-12 rounded object-contain border border-gray-400'
                onError={(e) => { e.target.src = "/default-avatar.png"; }}
              />
              <h3 className='font-medium'>{appt.userId.name}</h3>
            </div>

            {/* Status Text */}
            <p className={`${appt.status === 'Cancelled' ? 'text-red-500 font-bold' : appt.status === 'Completed' ? 'text-green-500 font-bold' : 'text-gray-600'}`}>
              {appt.status}
            </p>

            <p>{moment(appt.date).format('DD/MM/YYYY')}</p>

            {/* --- THIS IS THE ACTION COLUMN CHANGE YOU REQUESTED --- */}
            <div>
              {appt.status === 'Cancelled' ? (
                // 1. IF CANCELLED: Show Red "Cancelled" Button
                <button className='px-4 py-2 rounded-full bg-red-500 text-white font-medium cursor-not-allowed opacity-80'>
                  Cancelled
                </button>
              ) : appt.status === 'Completed' ? (
                // 2. IF COMPLETED: Show Green "Completed" Button
                <button className='px-4 py-2 rounded-full bg-green-500 text-white font-medium cursor-not-allowed opacity-80'>
                  Completed
                </button>
              ) : (
                // 3. IF PENDING: Show the actionable buttons (Cancel & Complete Icons)
                <div className='flex gap-3'>
                  <img
                    onClick={() => cancelAppointment(appt._id)}
                    src={assets.cancel_icon}
                    className='w-10 cursor-pointer hover:drop-shadow-md transition-all'
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointment(appt._id)}
                    src={assets.tick_icon}
                    className='w-10 cursor-pointer hover:drop-shadow-md transition-all'
                    alt="Complete"
                    title="Complete Appointment"
                  />
                </div>
              )}
            </div>
            {/* ----------------------------------------------------- */}

          </div>
        ))}
    </div >

  )
}

export default Dashboard