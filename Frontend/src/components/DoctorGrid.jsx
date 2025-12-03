import { useEffect } from 'react'
// import { AppContext } from '../../context/AppContext'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const DoctorList = () => {

    const { doctors, getAllDoctorsData, setSelectedDoctor } = useContext(AppContext)
    const navigate = useNavigate()
    const handleViewDetails = (doctor) => {
        setSelectedDoctor(doctor);
        navigate(`/bookappointment/${doctor._id}`);
    }

    useEffect(() => {
        getAllDoctorsData()
    }, [])
    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll '>
            <h1 className='text-blue-600 font-bold px-4 flex justify-center text-4xl mb-5'>All Doctors</h1>
            <div className='flex flex-wrap justify-center gap-4 px-4 py-3 gap-y-6 '>
                {Array.isArray(doctors) && doctors.length > 0 ? (
                    doctors.map((item, index) => (
                            <div className='border border-indigo-200 max-w-60 overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer rounded-xl shadow' key={index}>
                                <img className='p-2 bg-indigo-100 hover:bg-indigo-500 transition-all duration-500' src={item.image || '/default-avatar.png'}
                                    alt={item.name} />
                                <div className='px-2 py-1 hover:bg-gray-100 cursor-pointer'>
                                    <p className='text-gray-800 font-semibold'>{item.name}</p>
                                    <p className='text-gray-800 font-normal'>{item.speciality}</p>
                                    <p className='text-gray-800 font-normal'>{item.degree}</p>
                                    <p className='text-gray-800 font-normal'>{item.experience}</p>
                                    <p className='text-gray-800 font-normal'>Fees:${item.fees}</p>
                                    <p className={`mt-2 text-gray-700 font-normal ${item.available ? 'text-green-600' : 'text-red-600'}`}>{item.address?.line2}</p>
                                    <p className='text-gray-800 font-normal'>{item.available ? 'Available' : 'Unavailable'}</p>
                                      <button onClick={() => handleViewDetails(item)}
                                        className='mt-3 mb-2 bg-green-500 text-white px-4 py-2 rounded'
                                        disabled={!item.available}>
                                       View Details
                                    </button>
                                </div>
                            </div>
                    ))
                ) : (
                    <p className='px-4 text-gray-600'>No Doctor Found</p>
                )}
            </div>
        </div>
    )
}

export default DoctorList