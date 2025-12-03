import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { set } from 'mongoose';

const MyAppointment = () => {
  const { state } = useLocation();
  const [appointmentList, setAppointmentList] = useState([])
  const { backendUrl, token, appointment, fetchAppointment, loadingAppointment } = useAppContext();

  useEffect(() => {
    fetchAppointment()
  }, [])
  useEffect(() => {
    console.log('Fetched appointments:', appointment);
    if (Array.isArray(appointment)) {
      setAppointmentList(appointment)
    } else {
      console.warn('Appointment data is not an array:', appointment)
      setAppointmentList([])
    }
  }, [appointment]);

  const handlePayment = async (appointmentId) => {
    try {
      const res = await axios.put(`${backendUrl}/api/appointments/${appointmentId}/pay`, {}, {
        headers: { Authorization: token },
      });
      if (res.data.success) {
        toast.success('Payment completed!');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed');
    }
  };

  const handleCancel = async (appoinmentId) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/appointments/${appoinmentId}`, {
        headers: { Authorization: token },
      });
      if (res.data.success) {
        toast.success('Appointment cancelled');
        fetchAppointment()
      }
    } catch (err) {
      console.error('Cancel error:', err);
      toast.error('Cancellation failed');
    }
  };
  // console.log('Doctor image:', doctorData.image);

  if (loadingAppointment) return <p className="text-center mt-10">Loading appointments...</p>;

  if (!appointment) {
    return <p className="text-xl text-center text-gray-800 mt-20">No doctor Found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 bg-white rounded-lg shadow-lg grid grid-cols md:grid-cols-1 overflow-hidden">
      {Array.isArray(appointmentList) && appointmentList.length > 0 ? (
        appointmentList.map((appt) => (

          <div
            key={appt._id}
            className='grid grid-cols md:grid-cols-2 bg-gray-200 rounded-lg shadow-lg overflow-hidden mt-5 hover:bg-gray-300 cursor-pointer'>
            <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
              <img
                src={appt.doctor?.image}
                alt={appt.doctor?.name}
                className="w-42 h-42 rounded object-contain border mb-4"
                onError={(e) => { e.target.src = defaultAvatar; }} />
              <h3 className="text-xl font-bold text-blue-700">{appt.doctor?.name}</h3>
              <p className="text-sm text-gray-700">{appt.doctor?.speciality}</p>
              <p className="text-sm text-gray-700">Fee:₹{appt?.fees}</p>
            </div>
            {/* Right Panel: Appointment Details + Buttons */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Appointment Details</h2>
                <p><span className="font-semibold text-gray-700">Date:</span> {new Date(appt.date).toLocaleDateString()}</p>
                <p><span className="font-semibold text-gray-700">Time Slot:</span> {appt.slot}</p>
                <p><span className="font-semibold text-gray-700">Appointment ID:</span> {appt._id}</p>
                <p><span className="font-semibold text-gray-700">Status:</span> {appt.status}</p>
                <p>
                  <span className="font-semibold text-gray-700">Payment Status:</span>{' '}
                  <span className={`font-semibold ${appt.paymentStatus === 'completed' ? 'text-green-700' : 'text-yellow-700'}`}>
                    {appt.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                  </span>
                </p>
              </div>

              {/* /* Action Buttons */}
              <div className="mt-6 flex gap-4">
                {appt.paymentStatus === 'pending' && (
                  <button
                    onClick={() => handlePayment(appt._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    Make Payment
                  </button>
                )}
                {appt.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancel(appt._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl text-center text-gray-600">No appointments found.</p>
      )}
    </div>
  );
};

export default MyAppointment;
