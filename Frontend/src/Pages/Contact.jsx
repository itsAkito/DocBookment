
import React, { useState } from 'react'
import { assets } from '../assets/assets' // Assuming you have an image here, or remove img tag if not

const Contact = () => {

  // 1. Unified State Management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 3. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Message Sent Successfully!'); // Simple user feedback
    setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Reset form
  }

  return (
    <div className=' mt-20 min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
      
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Contact <span className='text-blue-600'>Us</span>
        </h2>
        <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
          Have a question or need to schedule an appointment? Fill out the form below or reach out to us directly.
        </p>
      </div>

      {/* Main Container Card */}
      <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row'>

        {/* Left Side: Contact Information & Image */}
        <div className='md:w-1/2 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-between'>
          <div>
            <h3 className='text-2xl font-bold mb-6'>Get in Touch</h3>
            <p className='text-blue-100 mb-8'>
              We are here to help you with your healthcare needs.
            </p>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                {/* Icons can be added here */}
                <div>
                  <h4 className='font-semibold text-lg'>Our Office</h4>
                  <p className='text-blue-100 text-sm'>123 Medical Center Drive,<br />Health City, HC 90210</p>
                </div>
              </div>
              
              <div className='flex items-start gap-4'>
                <div>
                  <h4 className='font-semibold text-lg'>Phone</h4>
                  <p className='text-blue-100 text-sm'>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div>
                  <h4 className='font-semibold text-lg'>Email</h4>
                  <p className='text-blue-100 text-sm'>support@medicalhub.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Decorative Image or Pattern */}
          <div className='mt-12 md:mt-0'>
             <img 
               src={assets.contact_image || "https://via.placeholder.com/400x300"} 
               alt="Contact Support" 
               className='rounded-lg opacity-80 mix-blend-overlay object-cover w-full h-48 hidden md:block'
             />
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className='md:w-1/2 p-8 md:p-12 bg-white'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Name Fields Row */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='Your Name'
                  required
                  className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Your Name'
                  required
                  className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='xyz@example.com'
                required
                className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
              />
            </div>

            {/* Message Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='How can we help you?'
                rows={4}
                required
                className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none'
              />
            </div>

            {/* Submit Button */}
            <button 
              type='submit' 
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.01] shadow-md'
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact

// import React, { useState } from 'react'


// const Contact = () => {
//   const [message, setMessage] = useState('')
//   const handlechange = (e) => {
//     setMessage(e.target.value)
//     console.log(e.target.value)
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Message sent:', message);
//     setMessage('');
//   }
//   return (
//     <div className='mx-auto mx-w-4xl p-6 mt-15 bg-gradient-to-r from-blue-200 to-blue-100 '>
//       <h2 className='p-10 w-full font-bold text-5xl
//        rounded-lg text-blue-600 flex justify-center'>Contact Us</h2>
//       <form onSubmit={handleSubmit} className='p-12 bg-white shadow-lg rounded-lg flex flex-col sm:space-x-4  sm:space-y-1 w-full items-center justify-center mx-w-auto m-auto'>
       
//        <div className=''>
//        <div className='mt-2'>
//           <label className='text-lg block mt-6'> First Name*
//           </label>
//           <input
//             type='text'
//             placeholder='Enter Your Name'
//             className='w-100 h-12 text-gray-800 bg-blue-100 border-2 
//           border-blue-300 rounded px-4 py-2 mt-6 focus:outline-none focus:ring-2
//           focus:ring-blue-400 '></input>
//         </div>
//         <div className='mt-2'>
//           <label className='text-lg block mt-6'> Last Name*
//           </label>
//           <input
//             type='text'
//             placeholder='Enter Your Name'
//             className=' w-100 h-12 text-gray-800 bg-blue-100 border-2 
//           border-blue-300 rounded px-4 py-2 mt-6 focus:outline-none focus:ring-2
//           focus:ring-blue-400 '></input>
//         </div>
//         <div className=' mt-2'>
//           <label className='text-lg block mt-6'> Email*
//           </label>
//           <input
//             type='text'
//             placeholder='Enter Your Email Here'
//             className='w-100 h-12 text-gray-800 bg-blue-100  border-2 
//           border-blue-300 rounded px-4 py-2 mt-6 focus:outline-none focus:ring-2
//           focus:ring-blue-400'></input>
//         </div>
//         <div className='mt-2' >
//           <label htmlFor='message' className='text-lg block mt-6'> Message*
//           </label>
//           <textarea
//             id='message'
//             name='message'
//             value={message}
//             onChange={handlechange}
//             placeholder='Enter Your Meassge Here'
//             rows={5}
//             className='w-100 h-48 text-gray-800 bg-blue-100 border-2 border-blue-300 focus:outline-none focus:ring-2
//           focus:ring-blue-400 rounded px-4 py-2 mt-4' />
//         </div>
//         <div className='flex justify-center'>
//         <button onClick={handleSubmit} className=' mt-4 bg-gradient-to-r bg-blue-500 text-white px-8 py-3 border-2 border-blue-500 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'>
//           Send Message
//         </button>
//         </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Contact