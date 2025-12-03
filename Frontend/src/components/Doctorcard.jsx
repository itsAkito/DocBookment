// import React, { use, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { doctors, specialityData } from '../assets/assets';
// const Doctorcard = ({ doctor }) => {
//   const navigate = useNavigate();
//   const [selectedSpeciality, setSelectedSpeciality] = useState(null)
//   const [showSpecialities, setShowSpecialities] = useState(false)
//   //filter doctors based on selected speciality
//   const filteredDoctors = selectedSpeciality ? selectedSpeciality === 'all'
//     ? doctors
//     : doctors.filter(doctor => doctor.speciality === selectedSpeciality):[];
//     // handle book appointment button click
//     const handleBookAppointment=(speciality)=>{
//       navigate('/search-doctors',{state:{speciality}})
//     }      
//   return (
//     <div className=' container mx-auto px-4 py-8 lg:py-8 sm:px-4'>
//       <div className=' mb-8'>
//         <h2 className='flex items-center text-gray-800 justify-center text-2xl font-bold mb-4'> Find the Doctors by Speciality</h2>
//         <div>
//           <button onClick={() => {setShowSpecialities(!showSpecialities)
//             setSelectedSpeciality('all')}
//           }
//             className={`flex items-center border-2 border-blue-600 text-white justify-center w-full mt-15 font-bold px-4 h-15 sm:py-2
//              sm:px-4 py-2 rounded-full hover:bg-blue-600 transtion duration-300 
//               focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer
//                ${selectedSpeciality === 'all'
//               ? 'bg-blue-400' : 'bg-blue-600'

//               }`}>
//             All Doctors
//             <svg className={`w-5 h-5 transition-transforms ${showSpecialities ? 'rotate-180' : ''}`}
//               fill='none'
//               viewBox='0 0 24 24'
//               stroke='currentColor'
//             >
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
//             </svg>
//           </button>
//           {showSpecialities && (
//             <div className="absolute mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
//               {specialityData.map((specialty, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     setSelectedSpeciality(specialty.speciality);
//                     setShowSpecialities(false);
//                   }}
//                   className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
//                 >
//                   <img
//                     src={specialty.image}
//                     alt={specialty.speciality}
//                     className="w-8 h-8"
//                   />
//                   <p className="font-medium">{specialty.speciality}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {/* doctors grid */}
//         <div className=' mt-10'>
//           {filteredDoctors.map((doctor,index) => (
//             <div key={index} className='bg-gradient-to-l from-blue-400 to-blue-200 mt-6 rounded-lg shadow-md p-6'>
//               <div className='flex items-center bg-gradient-to-r from-blue-400 to-blue-200 rounded-lg gap-5'>
//                 <img src={doctor.image}
//                   alt={doctor.name}
//                   className=' w-24 h-24 rounded-full object-cover'>
//                 </img>
//                 <div>
//                   <h3 className='text-xl font-medium'> {doctor.name}</h3>
//                   <p className=''>{doctor.speciality}</p>
//                   <p> {doctor.degree}</p>
//                   <p> {doctor.experience}</p>
//                 </div>
//               </div>
//               <div className='mt-4'>
//                 <p className='text-gray-700 line-clamp-2'> {doctor.about}</p>
//               </div>
//               <div className='mt-4'>
//                 <p className='text-gray-700 line-clamp-2'> {doctor.address.line2}</p>
//               </div>
//               <div className='mt-4'>
//                 <p className='text-gray-700 line-clamp-2'> {doctor.fees}</p>
//               </div> 
//                 <p className='mt-2 text-gray-700 line-clamp-2'> Speciality:{doctor.speciality}</p>
//                 <div className=' flex justify-center mt-4'>
//               <button onClick={()=>handleBookAppointment(doctor.speciality)}
//                 className="mt-4 w-1/2  transtion focus:outline-none focus:ring-2
//                  focus:ring-blue-600 border-2 border-blue-600 cursor-pointer bg-blue-600 py-2
//                   text-white rounded-full hover:bg-blue-400 transition duration-300">
//                 Book Appointment</button>
//                 </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Doctorcard

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const Doctorcard = () => {
  const navigate = useNavigate();
  
  const handleBookAppointment = (speciality) => {
    navigate('/search-doctors', { state: { speciality } });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-center text-gray-800 text-4xl font-bold mb-6'>
        Find <span className='text-blue-500 text-4xl'> Doctors </span>by Speciality
      </h2>

      <div className='flex flex-wrap justify-center gap-4'>
        {specialityData.map((specialty, index) => (
          <button
            key={index}
            onClick={() => handleBookAppointment(specialty.speciality)}
            className='flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-300 transition-all duration-300 transform hover:scale-105 shadow-md'
          >
            <img
              src={specialty.image}
              alt={specialty.speciality}
              className='w-6 h-6 rounded-full'
            />
            {specialty.speciality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Doctorcard;