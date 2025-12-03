import React, { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import upload_area from '../../../Frontend/src/assets/upload_area.png'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toggleState = () => {
        setState(prev => (prev === 'Admin' ? 'Doctor' : 'Admin'))
    }
    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken, doctor, setDoctor, backendUrl1 } = useContext(DoctorContext)
    const onSubmithandler = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                } else {
                    toast.error(data.message)
                }

            } else {
                const res = await axios.post(backendUrl1 + '/api/doctors/login', { email, password })
                if (res.data.success) {
                    localStorage.setItem('dToken', res.data.token)
                    if (res.data.doctor && res.data.doctor.image) {
                        localStorage.setItem('doctorImage', res.data.doctor.image);
                    }
                    toast.success("Login successful")
                    setDToken(res.data.token)
                    setDoctor(res.data.doctor)
                    console.log(res.data.token)
                    console.log(res.data.doctor)
                } else {
                    toast.error("Dotor Login:", res.data.message)
                }
            }
        } catch (error) {
            toast.error('Login failed')
            console.log(error)

        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen px-6 py-3 sm:px-4 lg:py-8 shadow shadow-pink-200 rounded  '>
            <div className='w-full max-w-md bg-blue-200 shadow-sky-100 rounded-lg px-5 py-3'>
                <h1 className='text-2xl text-center text-gray-900 font-medium mb-8 '><span className='text-blue-500'>{state}</span> Login</h1>
                <img src={upload_area} alt='' className='w-24 h-24 ml-38' />
                <form onSubmit={onSubmithandler} className='space-y-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-800 mb-2'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className=' w-full border  border-gray-800 px-3 py-2 rounded'
                            type='email'
                            required
                            placeholder='Enter Your Email' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-800 mb-2'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className=' w-full border border-gray-800  px-3 py-2 rounded'
                            type='password'
                            required
                            placeholder='Enter Your Email'
                        />
                    </div>
                    <button type="submit" className='w-full flex items-center justify-center bg-blue-600 rounded-full text-white py-2 hover:bg-blue-700 mb-5'>Login</button>
                    <p>
                        {state === 'Admin' ? 'Doctor' : 'Admin'} Login? {' '}
                        <span className='text-gray-800 underline cursor-pointer'
                            onClick={toggleState}>click here</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login