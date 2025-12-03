import React from 'react'
import { assets } from '../../../Frontend/src/assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

import {useNavigate}from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const {setAToken}=useContext(AdminContext)
  const{setDToken}=useContext(DoctorContext)
  const navigate=useNavigate()
  const logoutHandler=()=>{
    localStorage.removeItem('aToken')
    localStorage.removeItem('dToken')
    setAToken(null)
    setDToken(null)
    navigate('/')
  }
  return (
    <div className='flex justify-between w-full px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-100 shadow'>
        <div className='flex items-center'>
            <img src={assets.Medical} alt='Medical Logo' style={{ width: '160px' }}/>
            <p className='text-gray-800 m-1'>Admin</p>
        </div>
        <button onClick={logoutHandler} className=' text-white font-medium bg-blue-600 rounded-full px-8 py-2'>Logout</button>

    </div>
  )
}

export default Navbar