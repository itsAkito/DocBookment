import React from 'react'
import { useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'

const DoctorList = () => {

  const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])
  useEffect(() => {
    if (doctors.length > 0) {
      console.log("loading Doctors:", doctors)
    }
  }, [doctors])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
      <h1 className='text-gray-800 font-bold px-4'>All Doctors</h1>
      <div className='flex flex-wrap gap-4 px-4 py-3 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div className='border border-indigo-200 max-w-60 overflow-hidden cursor-pointer rounded-xl shadow' key={index}>
              <img className='p-2 bg-indigo-100 hover:bg-indigo-400 transition-all duration-500' src={item.image} alt='' />
              <div className='px-2 py-1'>
                <p className='text-gray-800 font-semibold'>{item.name}</p>
                <p className='text-gray-800 font-normal'>{item.speciality}</p>
                <p></p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(item._id)} type='checkbox' checked={item.available} />
                  <p className="text-gray-800 font-medium p-2.5">Available</p>
                </div>
              </div>
            </div>
          ))}
      </div>

    </div>
  )
}

export default DoctorList