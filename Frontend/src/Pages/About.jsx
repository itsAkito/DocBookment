// import React from 'react'
// import about_image from "../assets/about_image.png"
// import { assets } from '../assets/assets.js'
// import { doctors} from '../assets/assets.js'
// import { useNavigate } from 'react-router-dom'
// const About = () => {
//   const navigate=useNavigate();
//   return (
//     <div className='w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg mt-4 mx-auto p-6'>

//       <div className='container mx-auto px-4 py-2 sm:px-6 lg:px-8'>

//         {/* header Section */}
//         <div className=' mt-20 mb-12 flex-col lg:flex-row items-center gap-6'>
//           <img src={about_image} alt='About Us' className='w-full md:w-1/2 rounded-lg shadow-lg object-cover
//           ' />
//           <div>
//             <h1 className='text-4xl font-bold text-blue-600 mb-4 mt-5'>
//               About Medical Hub
//             </h1>
//             <p className='text-lg text-gray-700 font-medium mb-4'>
//               Medical Hub is your trusted healthcare platform ,connecting patients with qualified and verified medical professionals.our mission is to make healthcare accessible convenient, and reliable for everyone. </p>
//             <p className='text-lg text-gray-700  mb-2'>Our platform offers a wide range of services including Booking Appointment, prescription management, and health record tracking. we are committed to providing a seamless and user friendly experience for both patients and doctors.</p>
//             <p className='text-gray-600 mt-4 font-semibold'>with a wide range of specialties and experienced doctor, Medical Hub is committed to improving your healing journey. </p>
//           </div>
//         </div>
//         {/* features section */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12'>
//           <div className='bg-blue-100 rounded-lg p-6 text shadow-md text-center'>
//             <img src={assets.verified_icon} alt='Verified Doctors' className='w-12 h-12 mb-4 mx-auto' />
//             <h3 className='text-xl font-semibold text-blue-600 mb-2'>Easy Appointment</h3>
//             <p className='text-gray-700'>Book Appointment instantly with just a few clicks,anytime anywhere.</p>
//           </div>
//           <div className='bg-blue-100 rounded-lg p-6 text shadow-md text-center'>
//             <img src={assets.verified_icon} alt='Verified Doctors' className='w-12 h-12 mb-4 mx-auto' />
//             <h3 className='text-xl font-semibold text-blue-600 mb-2'>24/7</h3>
//             <p className='text-gray-700'>Our support team is available round the clock to assist you with your needs.</p>
//           </div>
//         </div>
//         {/* team section  */}
//         <div className='mb-12'>
//           <h1 className='text-2xl font-bold rounded hover:bg-blue-400 transition text-blue-700 mb-6 text-center'>Meet Our Team</h1>
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
//             {/* <div className='bg-gradient-to-r from-blue-400 to-blue-100 rounded-lg p-6 text-center shadow-md'> */}
//               {doctors.map((doctor,idx) => (
//                 <div key={idx} className='bg-blue-200 p-6 rounded-lg shadow hover:shadow-lg transition'>
//                   <img 
//                   src={doctor.image}
//                   alt={doctor.name} 
//                   className='w-24 h-24 rounded-full object-cover mb-4 mx-auto' />
//                   <h3 className='text-xl text-center font-medium'> {doctor.name}</h3>
//                   <p className='text-center text-gray-800'>{doctor.speciality}</p>
//                   <p className='text-center text-sm text-gray-700'> {doctor.degree}</p>
//                   <p className='text-center text-sm text-gray-700'> {doctor.experience}</p>
//                   <button onClick={()=>navigate('/bookappointment' ,{state:{doctorId:doctor.id}})} className='mt-4 bg-blue-400 text-center text-gray-800 rounded hover:bg-blue-600 grid transition w-full'>
//                     Book Appointment</button> 
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* call to action */}
//           <div className='text-center mt-12'>
//             <h2 className='font-bold text-blue-600 mb-4 text-2xl hover:bg-blue-400 rounded transition '> Ready to experience better healthcare?</h2>
//             <a href='/search-doctors' className='inline-block bg-gradient-to-r from-blue-400 to-blue-100 border-2 border-blue-500 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'>
//               find doctor
//             </a>
//           </div>
//         </div>
//       </div >

//   )
// }

// export default About


import React from 'react'
import { useNavigate } from 'react-router-dom'
import about_image from "../assets/about_image.png"
import { assets, doctors } from '../assets/assets.js'

const About = () => {
  const navigate = useNavigate();

  return (
    <div className=' w-full min-h-screen bg-gray-50 mt-20'>

      {/* --- Hero Section --- */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='flex flex-col md:flex-row items-center gap-10 lg:gap-16'>
          
          {/* Image */}
          <div className='w-full md:w-1/2'>
            <img 
              src={about_image} 
              alt='About Medical Hub' 
              className='w-full h-auto rounded-2xl shadow-xl object-cover hover:scale-[1.02] transition-transform duration-300' 
            />
          </div>

          {/* Content */}
          <div className='w-full md:w-1/2'>
            <h1 className='text-3xl md:text-5xl font-bold text-gray-800 mb-6'>
              About <span className='text-blue-600'>Medical Hub</span>
            </h1>
            <p className='text-lg text-gray-600 leading-relaxed mb-6'>
              Medical Hub is your trusted healthcare platform, connecting patients with qualified and verified medical professionals. Our mission is to make healthcare accessible, convenient, and reliable for everyone.
            </p>
            <p className='text-base text-gray-600 leading-relaxed mb-6'>
              Our platform offers a wide range of services including appointment booking, prescription management, and health record tracking. We are committed to providing a seamless and user-friendly experience for both patients and doctors.
            </p>
            
            <div className='border-l-4 border-blue-500 pl-4'>
              <p className='text-gray-700 font-medium italic'>
                "With a wide range of specialties and experienced doctors, Medical Hub is committed to improving your healing journey."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Why Choose Us (Features) --- */}
      <div className='bg-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800'>Why Choose Us</h2>
            <p className='text-gray-500 mt-2'>We focus on your health and convenience</p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            
            {/* Feature 1 */}
            <div className='bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <img src={assets.verified_icon} alt='Verified' className='w-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Easy Appointments</h3>
              <p className='text-gray-600'>Book appointments instantly with just a few clicks, anytime, anywhere without the hassle.</p>
            </div>

            {/* Feature 2 */}
            <div className='bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                {/* You can use a clock icon here if you have one, reusing verified for now */}
                <img src={assets.verified_icon} alt='Support' className='w-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>24/7 Support</h3>
              <p className='text-gray-600'>Our dedicated support team is available round the clock to assist you with your medical needs.</p>
            </div>

             {/* Feature 3 (Added to balance the grid) */}
             <div className='bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <img src={assets.verified_icon} alt='Expert' className='w-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Expert Doctors</h3>
              <p className='text-gray-600'>Access a network of top-rated specialists and verified medical professionals near you.</p>
            </div>

          </div>
        </div>
      </div>

      {/* --- Meet Our Team --- */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-12'>Meet Top Specialists</h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {doctors.slice(0, 4).map((doctor, idx) => ( // Added slice to only show top 4, remove slice if you want all
            <div 
              key={idx} 
              onClick={() => navigate(`/appointment/${doctor._id}`)} // Updated path assuming generic route
              className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group'
            >
              <div className='bg-blue-50 flex justify-center pt-4'>
                <img 
                  src={doctor.image}
                  alt={doctor.name} 
                  className='w-full h-48 object-contain object-bottom group-hover:scale-105 transition-transform duration-300' 
                />
              </div>
              
              <div className='p-5'>
                <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : 'text-gray-500'}`}>
                    <p className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
                    <p>{doctor.available ? 'Available' : 'Not Available'}</p>
                </div>
                <h3 className='text-lg font-bold text-gray-800 mt-2 truncate'>{doctor.name}</h3>
                <p className='text-sm text-gray-600'>{doctor.speciality}</p>
                
                {/* Optional: Add button here if you prefer explicit buttons over card click */}
                {/* <button className='w-full mt-4 py-2 rounded bg-blue-50 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors'>
                  Book Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Call to Action --- */}
      <div className='bg-gradient-to-r from-blue-500 to-indigo-600 py-16 mt-8'>
        <div className='max-w-4xl mx-auto text-center px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to prioritize your health?
          </h2>
          <p className='text-blue-100 text-lg mb-8'>
            Join thousands of satisfied patients who trust Medical Hub for their healthcare needs.
          </p>
          <button 
            onClick={() => navigate('/doctors')} // Navigate to doctor list
            className='bg-white text-blue-600 px-10 py-3 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg'
          >
            Find a Doctor
          </button>
        </div>
      </div>

    </div>
  )
}

export default About