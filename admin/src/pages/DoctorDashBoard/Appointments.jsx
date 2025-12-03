// import React, { useContext } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import moment from 'moment'
// import { assets } from '../../assets/assets'
// import axios from 'axios'

// const Appointments = () => {
//   const { backendUrl1, dToken, fetchAppointment, latestAppointments } = useContext(DoctorContext)
//   const handleCancel = async (appointmentId) => {
//     try {
//       const res = await axios.post(backendUrl1 + '/api/doctors/cancel', { appointmentId }, {
//         headers: { dtoken: dToken }
//       })
//       alert(res.data.message)
//       fetchAppointment();
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   const handleComplete = async (appointmentId) => {
//     try {
//       const res = await axios.post(backendUrl1 + '/api/doctors/complete', { appointmentId }, {
//         headers: { dtoken: dToken }
//       })
//       alert(res.data.message)
//       fetchAppointment();
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   return (
//     <div className=' w-full max-w-6xl m-5'>
//       <p className='text-xl font-bold text-gray-700 mb-5'>All Appointments </p>
//       <div className=' bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
//         <div className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 shadow border-b border-gray-200'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Status</p>
//           <p>Date </p>
//           <p>Action</p>
//         </div>

//         {
//           latestAppointments.map((appt, index) => (
//             <div key={appt._id} className='flex flex-wrap justify-between max-sm:gap-5 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-1 items text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
//               <p className='max-sm:hidden'>{index + 1}</p>
//               <div className='flex items-center gap-4'>
//                 {/* <h3>{appt.doctorId.name}</h3> */}

//                 <img
//                   src={appt.userId?.image} alt={appt.userId?.name} className='w-12 h-12 rounded object-contain border border-gray-400 '
//                   onError={(e) => {
//                     e.target.src = "/default-avatar.png"; // must exist in public folder
//                   }} />
//                 <h3>{appt.userId.name}</h3>
//               </div>
//               {/* <p>{appt.userId?.name}</p> */}
//               <p className='text-gray-700 text-sm'><span className={appt.status === 'Cancelled' ?
//                 'text-red-500 font-bold ' : appt.status === 'Completed' ? 'text-green-500 font-bold' :
//                   'text-gray-700 font-semibold'}>{appt.status}</span></p>
//               <p>{moment(appt.date).format('DD/MM/YYYY')}</p>
//               <div className='flex gap-2 '>
//                 {appt.status === 'booked' ? (
//                   // IF PENDING: Show Buttons
//                   <div className='flex gap-2'>
//                     <button
//                       onClick={() => handleCancel(appt._id)}
//                       className="p-2 bg-red-100 hover:bg-red-200 rounded-full group"
//                       title="Cancel Appointment"
//                     >
//                       {/* You can use an X icon here instead of text for cleaner look */}
//                       <span className='text-red-600 text-xs font-bold px-2'>Cancel</span>
//                     </button>

//                     <button
//                       onClick={() => handleComplete(appt._id)}
//                       className="p-2 bg-green-100 hover:bg-green-200 rounded-full group"
//                       title="Complete Appointment"
//                     >
//                       {/* You can use a Checkmark icon here instead of text */}
//                       <span className='text-green-600 text-xs font-bold px-2 '>Complete</span>
//                     </button>
//                   </div>
//                 ) : (
//                   // IF NOT PENDING (Completed or Cancelled): Show Status Text
//                   <div className={`text-xs font-bold px-3 py-4 rounded-full border ${appt.status === 'Cancelled'
//                       ? 'text-red-500 border-red-500 bg-red-50'
//                       : 'text-green-500 border-green-500 bg-green-50'
//                     }`}>
//                     {appt.status}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// }

// export default Appointments


import React, { useContext, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import moment from 'moment'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Appointments = () => {
  const { backendUrl1, dToken, fetchAppointment, latestAppointments } = useContext(DoctorContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(false)

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        setLoading(true)
        const res = await axios.post(backendUrl1 + '/api/doctors/cancel', { appointmentId }, {
          headers: { dtoken: dToken }
        })
        alert(res.data.message)
        fetchAppointment()
      } catch (err) {
        console.error(err)
        alert('Error cancelling appointment')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleComplete = async (appointmentId) => {
    if (window.confirm('Mark this appointment as completed?')) {
      try {
        setLoading(true)
        const res = await axios.post(backendUrl1 + '/api/doctors/complete', { appointmentId }, {
          headers: { dtoken: dToken }
        })
        alert(res.data.message)
        fetchAppointment()
      } catch (err) {
        console.error(err)
        alert('Error completing appointment')
      } finally {
        setLoading(false)
      }
    }
  }

  // Filter appointments
  const filteredAppointments = latestAppointments.filter(appt => {
    const matchesSearch = appt.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || appt.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className='w-full max-w-7xl mx-auto p-5'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Appointments</h1>
        <p className='text-gray-600'>Manage and track all your patient appointments</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <p className='text-gray-600 text-sm'>Total</p>
          <p className='text-2xl font-bold text-blue-600'>{latestAppointments.length}</p>
        </div>
        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <p className='text-gray-600 text-sm'>Completed</p>
          <p className='text-2xl font-bold text-green-600'>{latestAppointments.filter(a => a.status === 'Completed').length}</p>
        </div>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
          <p className='text-gray-600 text-sm'>Booked</p>
          <p className='text-2xl font-bold text-yellow-600'>{latestAppointments.filter(a => a.status === 'booked').length}</p>
        </div>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <p className='text-gray-600 text-sm'>Cancelled</p>
          <p className='text-2xl font-bold text-red-600'>{latestAppointments.filter(a => a.status === 'Cancelled').length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search by patient name or email...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <img src={assets.search_icon} alt='search' className='absolute right-3 top-2.5 w-5 h-5 opacity-50' />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='all'>All Status</option>
          <option value='booked'>Booked</option>
          <option value='Completed'>Completed</option>
          <option value='Cancelled'>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        {/* Desktop View */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-100 border-b'>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>#</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Patient</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Email</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Date</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Status</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt, index) => (
                  <tr key={appt._id} className='border-b hover:bg-gray-50 transition'>
                    <td className='px-6 py-4 text-sm text-gray-600'>{index + 1}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={appt.userId?.image || '/default-avatar.png'}
                          alt={appt.userId?.name}
                          className='w-10 h-10 rounded-full object-cover border border-gray-300'
                          onError={(e) => {
                            e.target.src = '/default-avatar.png'
                          }}
                        />
                        <span className='font-medium text-gray-800'>{appt.userId?.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600'>{appt.userId?.email || 'N/A'}</td>
                    <td className='px-6 py-4 text-sm text-gray-600'>{moment(appt.date).format('DD MMM YYYY')}</td>
                    <td className='px-6 py-4'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        appt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      {appt.status === 'booked' ? (
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleCancel(appt._id)}
                            disabled={loading}
                            className='px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition disabled:opacity-50'
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleComplete(appt._id)}
                            disabled={loading}
                            className='px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition disabled:opacity-50'
                          >
                            Complete
                          </button>
                        </div>
                      ) : (
                        <span className='text-xs text-gray-500'>No action</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className='md:hidden space-y-4 p-4'>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appt, index) => (
              <div key={appt._id} className='border rounded-lg p-4 bg-gray-50'>
                <div className='flex items-center gap-3 mb-3'>
                  <img
                    src={appt.userId?.image || '/default-avatar.png'}
                    alt={appt.userId?.name}
                    className='w-12 h-12 rounded-full object-cover border border-gray-300'
                  />
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-800'>{appt.userId?.name}</p>
                    <p className='text-xs text-gray-600'>{appt.userId?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className='space-y-2 text-sm mb-3'>
                  <p><span className='font-semibold text-gray-700'>Date:</span> {moment(appt.date).format('DD MMM YYYY')}</p>
                  <p><span className='font-semibold text-gray-700'>Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                      appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      appt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appt.status}
                    </span>
                  </p>
                </div>
                {appt.status === 'booked' && (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleCancel(appt._id)}
                      disabled={loading}
                      className='flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition disabled:opacity-50'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleComplete(appt._id)}
                      disabled={loading}
                      className='flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition disabled:opacity-50'
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='text-center py-8 text-gray-500'>
              No appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments