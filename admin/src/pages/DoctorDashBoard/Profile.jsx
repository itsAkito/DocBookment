import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const Profile = () => {
  const { doctor, backendUrl1 } = useContext(DoctorContext)

  if (!doctor) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl text-gray-600'>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>My Profile</h1>
          <p className='text-gray-600 mt-2'>Manage your professional information</p>
        </div>

        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          {/* Banner */}
          <div className='h-32 bg-gradient-to-r from-blue-500 to-indigo-600'></div>

          {/* Profile Content */}
          <div className='px-8 pb-8'>
            {/* Profile Image and Basic Info */}
            <div className='flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8'>
              <div className='relative'>
                <img
                  src={doctor.image || '/default-avatar.png'}
                  alt={doctor.name}
                  className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg'
                  onError={(e) => {
                    e.target.src = '/default-avatar.png'
                  }}
                />
              </div>

              <div className='flex-1'>
                <h2 className='text-3xl font-bold text-gray-800'>{doctor.name}</h2>
                <p className='text-lg text-blue-600 font-semibold mt-1'>{doctor.speciality}</p>
                <p className='text-gray-600 mt-2'>License: {doctor.license || 'N/A'}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
              {/* Contact Information */}
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                  <span className='text-blue-600'>📞</span> Contact Information
                </h3>
                <div className='space-y-3'>
                  <div>
                    <p className='text-gray-600 text-sm'>Email</p>
                    <p className='text-gray-800 font-semibold'>{doctor.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Phone</p>
                    <p className='text-gray-800 font-semibold'>{doctor.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Address</p>
                    <p className='text-gray-800 font-semibold'>{doctor.address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                  <span className='text-green-600'>💼</span> Professional Info
                </h3>
                <div className='space-y-3'>
                  <div>
                    <p className='text-gray-600 text-sm'>Speciality</p>
                    <p className='text-gray-800 font-semibold'>{doctor.speciality}</p>
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Consultation Fee</p>
                    <p className='text-gray-800 font-semibold text-lg'>₹{doctor.fees}</p>
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Experience</p>
                    <p className='text-gray-800 font-semibold'>{doctor.experience || 'N/A'} years</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className='md:col-span-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                  <span className='text-purple-600'>📝</span> About
                </h3>
                <p className='text-gray-700 leading-relaxed'>
                  {doctor.about || 'No additional information provided.'}
                </p>
              </div>

              {/* Availability */}
              <div className='md:col-span-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                  <span className='text-orange-600'>📅</span> Availability
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {doctor.available !== undefined ? (
                    <span className={`px-4 py-2 rounded-full font-semibold ${doctor.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {doctor.available ? '✓ Available' : '✗ Not Available'}
                    </span>
                  ) : (
                    <p className='text-gray-600'>Availability status not set</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 pt-6 border-t border-gray-200'>
              <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200'>
                Edit Profile
              </button>
              <button className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-200'>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile