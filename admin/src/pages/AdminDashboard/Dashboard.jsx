import React from 'react'
// import {doctor_icon } from './doctor_icon.svg'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import moment from 'moment'

const Dashboard = () => {
  const { doctors, appointments, uniquePatients } = useContext(AdminContext)
  const now = new Date();
  const latestAppointments = appointments.filter(appt => new Date(appt.date) >= now);

  return (
    <div className='p-7'>
      <div className=' flex flex-wrap gap-5 justify-between p-7'>
        <div className='flex-1 min-w-[250px] bg-gray-200 shadow-lg p-4 hover:bg-gray-300 hover:shadow-md rounded-lg transition-all duration-200 hover:scale-105'>
          <h2 className='text-lg font-semibold text-gray-800'>Doctor</h2>
          <img src={assets.doctor_icon} alt='doctor icon' className=' border-b border-gray-200 shadow rounded-lg mt-5' />
          <p className='text-gray-700'>{doctors.length}</p>
        </div>
        <div className='flex-1 min-w-[250] bg-gray-200 p-4 hover:bg-gray-300 hover:shadow-md rounded-lg shadow-lg transition-all duration-200 hover:scale-105'>
          <h2 className='text-lg font-semibold text-gray-800'>Appointment</h2>
          <img src={assets.appointments_icon} alt='doctor icon' className=' border-b border-gray-200 shadow rounded-lg mt-5 ' />
          <p className='text-gray-700 justify-center '>{appointments.length}</p>
        </div>
        <div className='flex-1 min-w-[250] bg-gray-200 p-4 hover:bg-gray-300 hover:shadow-md rounded-lg shadow-lg transition-all duration-200 hover:scale-105'>
          <h2 className='text-lg font-semibold text-gray-800'>Patient</h2>
          <img src={assets.patients_icon} alt='doctor icon' className=' border-b border-gray-200 shadow rounded-lg mt-5' />
          <p className='text-gray-700 '>{uniquePatients.length}</p>
        </div>
      </div>
      <div>
        <div className='mt-12 p-7'>
          <div className='flex items-center gap-4'>
          <img src={assets.list_icon} alt='list icon' className='w-4 h-4'/>
          <h2 className='text-gray-800 text-xl font-semibold'>Latest Appointments</h2>
          </div>
          <div className='flex items-center justify-start gap-38 mt-4 '>
            <p>Doctor</p>
            <p>Patient</p>
            <p>Date </p>
            <p>Status</p>
          </div>
          <div className='mt-6 rounded-lg shadow-md transition-all bg-gray-100 hover:bg-gray-200 '>

          {latestAppointments.map((appt) => (
            <div key={appt._id} className='grid grid-cols lg:grid-cols-6 gap-6 px-6 py-4 items-center border-b border-gray-200 rounded-lg'>
              {/* <p>{index + 1}</p> */}
              <div className='flex items-center gap-3'>
                {/* <h3>{appt.doctorId.name}</h3> */}
                <img
                  src={appt.doctorId?.image} alt={appt.doctorId?.name} className='w-12 h-12 rounded-full object-contain border border-gray-400 '
                  onError={(e) => {
                    e.target.src = "/default-avatar.png"; // must exist in public folder
                  }} />
                <h3>{appt.doctorId.name}</h3>
              </div>
              <div className='flex items-center gap-3'>
               <img
                  src={appt.userId?.image} alt={appt.userId?.name} className='w-12 h-12 rounded-full object-contain border border-gray-400 '
                  onError={(e) => {
                    e.target.src = "/default-avatar.png"; // must exist in public folder
                  }} />
                                <p>{appt.userId?.name}</p>

              </div>
              {/* <p>{appt.userId?.age}</p> */}
              <p>{moment(appt.date).format('DD/MM/YYYY')}</p>
              <p>{appt.status}</p>
            </div>
            
          ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard