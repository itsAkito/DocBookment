import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import axios from 'axios'

const DoctorDetails = () => {
    const { id } = useParams()
    const{backendUrl,setSelectedDoctor}=useAppContext()
    const [doctor, setDoctor] = useState(null)
    const [loading,setLoading]=useState(null)
     const navigate= useNavigate()
    useEffect(() => {
        const fetchDoctor = async () => {
        const  res = await axios.get(backendUrl + '/api/doctors/'+ id);
            if (res.data.success) {
                setDoctor(res.data.doctor);
            }else{
                console.error(res.data.message)
            }
        };
        fetchDoctor();
    }, [id,backendUrl])
    const handleBookAppointment=()=>{
        setSelectedDoctor(doctor);
        navigate(`/bookappointment/${doctor._id}`);
    }
    if (loading) {
    return <p className="text-center mt-6">Loading doctor details...</p>;
  }

    if (!doctor)
        return <p className='text-center mt-6 text-red-600'>Doctor not found.</p>
    return (
        <div className='max-w-4xl mx-auto p-5'>
            <div className='bg-gray-200 p-5 rounded shadow'>
                <div className=' flex items-center gap-6'>
                    <img src={doctor.image|| 'default -avatar.png'}
                        alt={doctor.name}
                        className=' w-32-h-32 rounded-full object-cover mx-auto' />
                    <div>
                        <h2 className='text-2xl font-bold text-center mt-4'>{doctor.name}</h2>
                        <p className='text-center text-gray-800'>{doctor.speciality}</p>
                        <p className='text-center text-gray-700'>{doctor.degree}</p>
                        <p className='text-center text-gray-800'>Experience: {doctor.experience}</p>
                        <p className='text-center text-gray-800'>Fees:{doctor.fees}</p>
                        <p className='text-center text-gray-800'>Location:{doctor.address?.line2}</p>
                        <p className='text-center text-gray-800'>Availability:{doctor.availability}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">About</h3>
                    <p className="text-gray-600 mt-2 whitespace-pre-line">{doctor.about || 'No description provided.'}</p>
                </div>
                <div>
                    <button
                    onClick={handleBookAppointment} className='bg-green-500 text-white px-5 py-3 hover:bg-green-600 transition'
                    disabled={!doctor.available}>Book Appointment</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails