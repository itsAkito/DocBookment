import { set } from 'mongoose'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useMemo } from 'react'
import moment from 'moment'

import {useNavigate} from 'react-router-dom'
const Appointment = () => {

  // const [appointments, setAppointments] = useState([])
  const [filters, setFilters] = useState({ doctorName: '', status: '', date: '' })
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext)
  const navigate=useNavigate()
  useEffect(() => {

    //fetcj all appointments form backend
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  const filteredApppointments = useMemo(() => {
    if (!Array.isArray(appointments)|| appointments.length === 0)
      return []

    return appointments.filter((appt) => {
      const doctorName = (appt.doctorId?.name || '').toLowerCase();
      const matchesDoctorName = doctorName.includes(filters.doctorName.toLowerCase().trim());
      const matchesStatus = filters.status ? appt.status === filters.status : true;
      const appDate = appt.date ? new Date(appt.date).toISOString().slice(0, 10) : ''
      const matchesDate = filters.date ? appDate === filters.date : true;
      return matchesDoctorName && matchesStatus && matchesDate
    })
  }, [appointments, filters])
 
  return (
    <div className='bg-gray-200 rounded-lg shadow-md border border-gray-200'>
      <p className='text-gray-800 text-xl font-medium px-4 sm:px-6 py-3'>All Appointments</p>
      
      {/* Filter and Action Buttons Section */}
      <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-4 border-b border-gray-300 px-4 sm:px-6 py-4 '>
        
        {/* Search Input */}
        <div className='relative w-full sm:w-auto flex-shrink-0'>
          <input type='text'
            placeholder="Search doctor"
            value={filters.doctorName}
            onChange={(e) => setFilters({ ...filters, doctorName: e.target.value })}
            className='pl-10 text-gray-700 border w-full px-3 py-2 rounded shadow cursor-pointer' />
          <FaSearch className=' absolute left-3 top-3 text-gray-700' />
        </div>
        
        {/* Status Select */}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className='text-gray-700 border px-3 py-2 rounded shadow cursor-pointer w-full sm:w-auto flex-shrink-0'>
          <option value="">All Status</option>
          <option value="booked">Booked</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>

        {/* Date Input */}
        <input type='date'
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className='text-gray-700 border px-3 py-2 rounded shadow w-full sm:w-auto flex-shrink-0' />
          
        {/* Clear Filters Button */}
        <button
          onClick={() => setFilters({ doctorName: '', status: '', date: '' })}
          className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 w-full sm:w-auto flex-shrink-0"
        >
          Clear Filters
        </button>
        
        {/* New Appointment Button - Moved to end */}
        <button onClick={()=>navigate('/book-appointment')}
          className='bg-indigo-600 text-white px-4 py-2 rounded shadow cursor-pointer hover:bg-indigo-500 mt-2 sm:mt-0 ml-auto flex-shrink-0'>
          + New Appointment
        </button>
        
        {/* Explore Data Button - Removed ml-auto to allow wrap*/}
        <button onClick={()=>navigate('/explore')}
          className='bg-indigo-600 text-white px-4 py-2 rounded shadow cursor-pointer hover:bg-indigo-500 flex-shrink-0'>
          Explore Data
        </button>
      </div>
      
      {/* Appointment List Header (Visible on large screens) */}
      {/* The list header now only appears on 'lg' screens or larger, as the small screen view will stack the data */}
      <div className='hidden lg:grid grid-cols-7 gap-4 px-6 py-4 bg-gray-200 hover:bg-gray-300 shadow border-b border-gray-200'>
        <p>#</p>
        <p>Doctor</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date </p>
        <p>Time</p>
        <p>Status</p>
      </div>

      {/* Appointment List Container (Scrollable on small screens) */}
      <div className='overflow-x-auto'>
        { filteredApppointments.length > 0 ? (
          filteredApppointments.map((appt, index) => (
            // Responsive Row: Uses lg:grid for large screens, and flex/list for small screens
            <div key={appt._id} className='px-4 sm:px-6 py-4 border-b border-gray-200'>
                
                {/* Large Screen View (Grid) */}
                <div className='hidden lg:grid grid-cols-7 gap-4 items-center'>
                    <p>{index + 1}</p>
                    <div className='flex items-center gap-3'>
                        <img
                            src={appt.doctorId?.image} alt={appt.doctorId?.name} className='w-12 h-12 rounded object-contain border border-gray-400 '
                            onError={(e) => {
                                e.target.src = "/default-avatar.png"; 
                            }} />
                        <h3 className='font-semibold'>{appt.doctorId.name}</h3>
                    </div>
                    <p>{appt.userId?.name}</p>
                    <p>{appt.userId?.age}</p>
                    <p>{moment (appt.date).format('DD/MM/YYYY')}</p>
                    <p>{appt.slot}</p>
                    <p className={`font-medium ${appt.status === 'booked' ? 'text-green-600' : appt.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{appt.status}</p>
                </div>
                
                {/* Small Screen View (Stacked) */}
                <div className='lg:hidden space-y-2'>
                    <div className='flex justify-between items-center border-b pb-2'>
                        <div className='flex items-center gap-3'>
                            <img
                                src={appt.doctorId?.image} alt={appt.doctorId?.name} className='w-10 h-10 rounded object-contain border border-gray-400 '
                                onError={(e) => {
                                    e.target.src = "/default-avatar.png"; 
                                }} />
                            <div>
                                <h3 className='font-bold text-lg'>{appt.doctorId.name}</h3>
                                <p className='text-sm text-gray-600'>Patient: {appt.userId?.name} ({appt.userId?.age})</p>
                            </div>
                        </div>
                        <p className={`font-semibold ${appt.status === 'booked' ? 'text-green-600' : appt.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{appt.status}</p>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <p><strong>Date:</strong> {moment (appt.date).format('DD/MM/YYYY')}</p>
                        <p><strong>Time:</strong> {appt.slot}</p>
                    </div>
                </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10 mb-6">No appointments match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Appointment