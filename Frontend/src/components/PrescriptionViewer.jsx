
import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const PrescriptionViewer = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { backendUrl, token } = useContext(AppContext)
  const [prescription, setPrescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '', duration: '' }
  ])

  const { doctorData, slot, date, paymentStatus = 'pending', status = 'booked', appointmentId } = state || {}

  if (!doctorData) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-xl text-gray-600 mb-4'>No Appointment Found</p>
          <button
            onClick={() => navigate('/')}
            className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }])
  }

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines]
    updatedMedicines[index][field] = value
    setMedicines(updatedMedicines)
  }

  const handleSubmitPrescription = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        backendUrl + '/api/prescriptions/add',
        {
          appointmentId,
          prescription,
          medicines: medicines.filter(m => m.name)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      alert('Prescription saved successfully!')
      navigate('/my-appointments')
    } catch (err) {
      console.error(err)
      alert('Error saving prescription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4'
          >
            <span>←</span> Back
          </button>
          <h1 className='text-4xl font-bold text-gray-800'>Prescription Viewer</h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Appointment Details - Left Side */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-lg p-6 sticky top-6'>
              <h2 className='text-2xl font-bold text-blue-600 mb-6'>Appointment Details</h2>

              {/* Doctor Card */}
              <div className='text-center mb-6'>
                <img
                  src={doctorData.image || '/default-avatar.png'}
                  alt={doctorData.name}
                  className='w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200'
                  onError={(e) => {
                    e.target.src = '/default-avatar.png'
                  }}
                />
                <h3 className='text-xl font-semibold text-gray-800'>{doctorData?.name}</h3>
                <p className='text-sm text-gray-600 mb-2'>{doctorData?.speciality}</p>
                <div className='flex items-center justify-center gap-1 text-yellow-400 mb-3'>
                  {'⭐'.repeat(5)}
                </div>
              </div>

              {/* Details List */}
              <div className='space-y-4 border-t pt-4'>
                <div>
                  <p className='text-xs font-semibold text-gray-500 uppercase'>Appointment ID</p>
                  <p className='text-sm font-semibold text-gray-800'>{appointmentId}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-gray-500 uppercase'>Date</p>
                  <p className='text-sm font-semibold text-gray-800'>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-gray-500 uppercase'>Time Slot</p>
                  <p className='text-sm font-semibold text-gray-800'>{slot}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-gray-500 uppercase'>Consultation Fee</p>
                  <p className='text-lg font-bold text-green-600'>₹{doctorData?.fees}</p>
                </div>
                <div className='pt-2 border-t'>
                  <p className='text-xs font-semibold text-gray-500 uppercase mb-2'>Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    paymentStatus === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {paymentStatus === 'completed' ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
                <div className='pt-2'>
                  <p className='text-xs font-semibold text-gray-500 uppercase mb-2'>Appointment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Form - Right Side */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Add Prescription</h2>

              {/* Diagnosis/Notes */}
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Diagnosis & Notes
                </label>
                <textarea
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  placeholder='Write patient diagnosis, observations, and medical notes...'
                  rows='4'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Medicines */}
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>Medicines</h3>
                  <button
                    onClick={handleAddMedicine}
                    className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition'
                  >
                    + Add Medicine
                  </button>
                </div>

                <div className='space-y-4'>
                  {medicines.map((medicine, index) => (
                    <div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
                        <div>
                          <label className='block text-xs font-semibold text-gray-700 mb-1'>
                            Medicine Name
                          </label>
                          <input
                            type='text'
                            value={medicine.name}
                            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                            placeholder='e.g., Paracetamol'
                            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                          />
                        </div>
                        <div>
                          <label className='block text-xs font-semibold text-gray-700 mb-1'>
                            Dosage
                          </label>
                          <input
                            type='text'
                            value={medicine.dosage}
                            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                            placeholder='e.g., 500mg'
                            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div>
                          <label className='block text-xs font-semibold text-gray-700 mb-1'>
                            Frequency
                          </label>
                          <input
                            type='text'
                            value={medicine.frequency}
                            onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                            placeholder='e.g., Twice daily'
                            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                          />
                        </div>
                        <div>
                          <label className='block text-xs font-semibold text-gray-700 mb-1'>
                            Duration
                          </label>
                          <input
                            type='text'
                            value={medicine.duration}
                            onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                            placeholder='e.g., 5 days'
                            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                          />
                        </div>
                      </div>
                      {medicines.length > 1 && (
                        <button
                          onClick={() => handleRemoveMedicine(index)}
                          className='mt-3 text-red-500 hover:text-red-700 text-sm font-semibold'
                        >
                          Remove Medicine
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-3 pt-6 border-t'>
                <button
                  onClick={() => navigate(-1)}
                  className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPrescription}
                  disabled={loading}
                  className='flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50'
                >
                  {loading ? 'Saving...' : 'Save Prescription'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionViewer