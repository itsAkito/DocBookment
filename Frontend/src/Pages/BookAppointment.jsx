import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { set } from 'mongoose'; 
// import { useAppContext } from '../context/AppContext';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, setSelectedDoctor, selectedDoctor, userId, bookedAppointment } = useAppContext();

  const [doctor, setDoctor] = useState(selectedDoctor || null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([])

  const formDataWiththeDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(
      'en-US', options)
  }
  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/doctors/${doctorId}`);
        if (res.data.success) {
          setDoctor(res.data.doctor);
          setSelectedDoctor(res.data.doctor);
        }
      } catch (err) {
        console.error('Error fetching doctor:', err);
      } finally {
        setLoading(false);
      }
    };
    if (!doctor && doctorId) fetchDoctor();
    else setLoading(false);
  }, [doctorId, backendUrl]);
  // Example: generate dummy slots (replace with backend data)
  useEffect(() => {
    const times = ['10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '01:00 pm'];
    setSlots(times);
  }, []);

  // useEffect(()=>{
  //   const fetchBookedSlots=async()=>{
  //     if(!selectedDate||!doctorId){
  //       return
  //     }
  //     try{
  //       const res=await axios.get( backendUrl+'/api/appiontment/')
  //       if(res.data.success){
  //         setBookedSlots(res.data.bookedSlots)
  //       }
  //     }
  //     catch(error){
  //       console.error('Error fetching booked slots:', err)
  //     }
  //   }

  // })
  
  const handleBook = async () => {
    if (!selectedSlot)
      return alert('Please select a time slot');
    // send booking request here
    if (!doctor?._id || !userId || !selectedDate || !selectedSlot) {
      toast.error('Please fill all required fields before booking');
      return;
    }
    const response = await bookedAppointment({
      doctorId: doctor?._id,
      userId,
      date: selectedDate,
      slot: selectedSlot,
    })
    if (response.success && response.appointment
    ) {
      toast.success('Appointment Booked!')
      navigate('/my-appointment', {
        state: {
          doctorId: doctor._id,
          slot: selectedSlot,
          date: selectedDate,
          appointmentId: response.appointmentID,
          paymentStatus: response.appointment.paymentStatus,
          status: response.appointment.status
        },
      })
    } else {
      toast.error(response.message || 'Booking failed')
      setSelectedSlot(null)
    }
  };

  if (loading) return <p className="text-center mt-6">Loading doctor details...</p>;
  if (!doctor) return <p className="text-center mt-6 text-red-600">Doctor not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow-md mt-20 mb hover:bg-gray-200 transition-all duration-300">
      {/* Doctor Profile */}
      <div className="flex items-center gap-6">
        <img
          src={doctor.image || '/default-avatar.png'}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{doctor.name}</h2>
          <p className="text-gray-700">{doctor.speciality}</p>
          <p className="text-gray-700">{doctor.degree}</p>
          <p className="text-gray-700">Experience: {doctor.experience} years</p>
          <p className="text-gray-700">Fees: ${doctor.fees}</p>
        </div>
      </div>

      {/* About */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">About</h3>
        <p className="mt-2 text-gray-600 whitespace-pre-line">
          {doctor.about || 'No description provided.'}
        </p>
      </div>
      <div className='mt-6'>
        <h3 className='text-xl font-semibold mb-2'>Select Date</h3>
        <input type='date'
          // placeholder='e.g:2025-10-28'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className=' w-full px-4 py-2 border outline-none rounded'
          required />
      </div>
      {selectedDate && (
        <div className='mt-2 text-gray-700 font-medium'>
          Selected Date:{formDataWiththeDate(selectedDate)}
        </div>
      )}

      {/* Booking Slots */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Booking Slots</h3>
        <div className="grid grid-cols-3 gap-3">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-4 py-2 rounded border cursor-pointer
                ${selectedSlot === slot ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="mt-6">
        <button
          onClick={handleBook}

          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;