import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';


const SearchDoctors = () => {

    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [selectedSpeciality,setSelectedSpeciality]=useState(null)
    const { doctors } = useAppContext()
    const navigate = useNavigate();
   
    useEffect(() => {
        if(!selectedSpeciality || selectedSpeciality==='General Physician'){
            setFilterDoc(doctors)
        }else{
            setFilterDoc(doctors.filter(doc=>doc.speciality===selectedSpeciality))
        }
    }, [doctors, selectedSpeciality]
    );
const handleSpeciality=(spec)=>{
    setSelectedSpeciality(spec);

}
    return (
        <div className='mt-20'>
            <p className='ml-10 text-gray-800'>
                Browse through the doctor's specialities
            </p>
            <div className='flex flex-col lg:flex-row gap-5 mt-6 ml-10'>
            <div className='text-gray-800 flex flex-col gap-4 '>
                <p onClick={()=>handleSpeciality('General Physician') }
                className={`border border-indigo-300 rounded px-4 py-2  shadow hover:scale-105 transition-all duration-300 hover:bg-blue-200 cursor-pointer ${selectedSpeciality==='General Physician'}`}>General Physician</p>
                <p onClick={()=>handleSpeciality('Gynecologist')}
                 className={`border border-indigo-300 px-4 py-2 rounded shadow transition-all hover:bg-blue-200 duration-300 hover:scale-105 cursor-pointer pr-15 pl-4 ${selectedSpeciality==='Gynecologist'}`}>Gynecologist</p>
                <p onClick={()=>handleSpeciality('Dermatologist')} 
                className={`border border-indigo-300 px-4 py-2 rounded shadow transition-all hover:bg-blue-200 duration-300 hover:scale-105 cursor-pointer pr-15 pl-4 ${selectedSpeciality==='Dermatologist'}`}>Dermatologist</p>
                <p onClick={()=>handleSpeciality('Pediatricians')} 
                className={`border border-indigo-300 px-4 py-2 rounded shadow transition-all hover:bg-blue-200 duration-300 hover:scale-105 cursor-pointer pr-15 pl-4 ${selectedSpeciality==='Pediatricians'}`}>Pediatrician</p>
                <p onClick={()=>handleSpeciality('Neurologist')} 
                className={`border border-indigo-300 px-4 py-2 rounded shadow transition-all hover:bg-blue-200 duration-300 hover:scale-105 cursor-pointer pr-15 pl-4 ${selectedSpeciality==='Neurologist'}`}>Neurologist</p>
                <p onClick={()=>handleSpeciality('Gastroenterologist')} 
                className={`border border-indigo-300 px-4 py-2 rounded shadow transition-all hover:bg-blue-200 duration-300 hover:scale-105 cursor-pointer pr-15 pl-4 ${selectedSpeciality==='Gastroenterologist'?'bg-indigo-400':'hover:bg-indigo-200'}`}>Gastroenterologist</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 ml-10 mb-10'>
                {filterDoc.map((item, index) => (
                    <div onClick={() => navigate(`/bookappointment/${item._id}`)} className='border border-indigo-200 max-w-60 overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer rounded-xl shadow' key={index}>
                        <img className='p-2 bg-indigo-100 hover:bg-indigo-500 transition-all duration-500' src={item.image} alt='' />
                        <div className='px-2 py-1 hover:bg-gray-100 cursor-pointer'>
                            <p className='text-gray-800 font-semibold'>{item.name}</p>
                            <p className='text-gray-800 font-normal'>{item.speciality}</p>
                            <p className='text-gray-800 font-normal'>{item.degree}</p>
                            <p className='text-gray-800 font-normal'>{item.experience}</p>
                            <p className='text-gray-800 font-normal'>Fees:${item.fees}</p>
                            <p className={`mt-2 font-normal ${item.available ? 'text-green-600' : 'text-red-600'}`}>{item.address?.line2}</p>
                            <p className='text-gray-800 font-normal'>{item.available ? 'Available' : 'Unavailable'}</p>
                        </div>
                    </div>
                ))
                }
                </div>
            </div>
        </div>
    )
}
export default SearchDoctors