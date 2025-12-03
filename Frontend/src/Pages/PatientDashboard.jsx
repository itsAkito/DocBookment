import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const samplePatient = {
  id: 'p1',
  name: 'Jayant Kumar',
  email: 'abcde@gmail.com',
  phone: '+91 9876542234',
  age: 26,
  gender: 'Male',
  city: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  profileimage: assets.Jayant

}
const sampleAppointments = [
  { id: 'ap1', doctor: 'Dr. K.P Saxena', time: '2025-09-12 10:00 AM', speciality: 'Dermatologist', status: 'upcoming', fee: 50 },
  { id: 'ap2', doctor: 'Dr. Priya Sharma', time: '2025-09-15 03:30 PM', speciality: 'Pediatrician', status: 'upcoming', fee: 60 },
  { id: 'ap3', doctor: 'Dr. Andrew Williams', time: '2025-08-20 11:00 AM', speciality: 'Neurologist', status: 'completed', fee: 80 }

]
const samplePrescription = [
  { id: 'pr1', issuedBy: 'Dr. K.P Saxena', date: '2025-08-20', summary: 'Paracetamol 500mg, Amoxicillin 250mg' },
  { id: 'pr2', issuedBy: 'Dr. Priya Sharma', date: '2025-07-02', summary: 'Cetirizine 10mg' },
]
const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patient] = useState(samplePatient)
  const [appointment, setAppointments] = useState(sampleAppointments)
  const [prescription, setPrescription] = useState(samplePrescription);
  const upcoming = appointment.filter(a => a.status === 'upcoming')
  const past = appointment.filter(a => a.status !== 'upcoming')
  const cancelAppointment = (id) => {
    setAppointments(a => a.id == id ? { ...a, status: 'cancelled' } : a)
  }
  return (
    <div className='min-h-screen bg-white rounded py-8 px-4 mt-5 mb-6'>
      <div className='mx-auto mt-4 mb-6'>
        <div className='flex items-center justify-between text-2xl gap-6'>
          <h2 className='font-bold text-indigo-600'>My Dashboard</h2>
          <div className='flex items-center gap-4 '>
            <button onClick={() => navigate('/search-doctors')} className='bg-blue-500 text-white border-2 border-blue-700 rounded-lg p-2 hover:bg-blue-300'>Book Appointment</button>
          </div>
        </div>

        {/* Patient profile */}

        <div className='grid grid-cols-1 mt-6 w-full gap-6'>
          <div className=' bg-indigo-100 rounded-lg shadow p-6 mb-4 w-full  hover:scale-105 transition-all duration-300 cursor-pointer'>
            <div className='flex flex-col items-center justify-center'>
              <img src={assets.Jayant} alt=''
                className='w-42 h-42 mt-4 rounded-full bg-white' />
              <h3 className='text-gray-800 font-semibold'>{patient.name}</h3>
              <p className='text-sm text-gray-800'>{patient.city},{patient.state},{patient.country}
              </p>
            </div>
            <div className='text-gray-800 flex items-start justify-between'> <span>Age</span><span>{patient.age}</span></div>
            <div className='text-gray-800 flex items-start justify-between'> <span>Gender</span><span>{patient.gender}</span></div>
            <div className='text-gray-800 flex items-start justify-between'> <span>Phone</span><span>{patient.phone}</span></div>
            <div className='text-gray-800 flex items-start justify-between'> <span>Email</span><span>{patient.email}</span></div>
          </div>
          <div className='grid lg:col-span-2 space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <div className='bg-indigo-100 rounded-lg shadow-md w-full h-24 p-4 px-6 py-3 mb-4 flex items-center justify-between  hover:scale-105 transition-all duration-300 cursor-pointer '>
                <div>
                  <div className='text-gray-800 font-semibold'>Upcoming</div>
                  <div className='text-gray-800 font font-semibold'>{upcoming.length}</div>
                </div>
                <div className="text-blue-500 text-3xl flex justify-end">📅</div>
              </div>
              <div className='bg-indigo-100 rounded-lg  shadow-md  hover:scale-105 transition-all duration-300 cursor-pointer w-full mb-4 h-24 p-4 px-6 py-3 flex items-center justify-between '>
                <div>
                  <div className='text-gray-800 font-semibold'>Prescription</div>
                  <div className='text-gray-800 font font-semibold'>{prescription.length}</div>
                </div>
                <div onClick={() => navigate('/prescriptionviewer')} className="text-blue-500 text-3xl flex justify-end">💊</div>
              </div>
              <div className='bg-indigo-100 rounded-lg shadow-md  hover:scale-105 transition-all duration-300 cursor-pointer w-full mb-4 h-24 p-4 px-6 py-3 flex items-center justify-between '>
                <div>
                  <div className='text-gray-800 font-semibold'>Past Visits</div>
                  <div className='text-gray-800 font-semibold'>{past.length}</div>
                </div>
                <div className="text-blue-500 text-3xl flex justify-end">🩺</div>
              </div>
            </div>
          </div>
        </div>
        {/* //Appointment book */}
        <div className='p-4 mb-6 bg-indigo-100 rounded shadow-md  hover:scale-105 transition-all duration-300 cursor-pointer'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-gray-800 font-bold text-2xl'>Upcoming Appointment</h2>
            <button onClick={() => navigate('/search-doctors')} className='text-white bg-blue-500 border-2
               border-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg p-3'>Book New</button>
          </div >
          <div className='p-4 space-y-2'>
            {upcoming.length === 0 && <div className='text-gray-800'>No Upcoming Appointment</div>}
            {upcoming.map(a => (
              <div key={a.id} className='flex items-center justify-between rounded-lg '>
                <div>
                  <div className='font-semibold'>{a.doctor}</div>
                  <div className='text-medium text-gray-700'>{a.speciality}</div>
                  <div className='text-gray-700'> {a.time}</div>
                </div>
                <div className=' flex items-center justify-center gap-5'>
                  <div className='font-semibold text-gray-700'>{a.fee}</div>
                  <button onClick={() => cancelAppointment(a.id)}
                    className='bg-red-400 rounded-lg text-white px-4 py-2 shadow p-2'>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='p-4 bg-indigo-100 rounded shadow-md hover:scale-105 transition-all duration-300 cursor-pointer'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-gray-800 font-bold text-2xl'>Recent Appointment</h2>
            <button onClick={() => navigate('/prescriptionviewer')} className='text-white bg-blue-500 border-2
               border-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg p-3'>View All</button>
          </div >
          <div className='p-4 space-y-2'>

            {prescription.map(p => (
              <div key={p.id} className='flex items-center justify-between rounded-lg '>
                <div>
                  <div className='font-semibold'>{p.issuedBy}</div>
                  <div className='text-gray-700'> {p.date}</div>
                  <div className='text-gray-700'> {p.summary}</div>
                </div>
                <div className=' flex items-center justify-center gap-5'>
                  <button onClick={() => navigate('/prescriptionviewer', { state: { prescriptionId: p.id } })} className='bg-red-400 rounded-lg text-white px-4 py-2 shadow p-2 '>View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard










