
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import Setting from './pages/AdminDashboard/Setting';
import AddDoctors from './pages/AdminDashboard/AddDoctors';
import Appointment from './pages/AdminDashboard/Appointment';
import DoctorList from './pages/AdminDashboard/DoctorList';
import Dashboard from './pages/AdminDashboard/Dashboard';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Layout from './pages/Layout';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/DoctorDashBoard/DoctorDashboard';
import Appointments from './pages/DoctorDashBoard/Appointments';
import Profile from './pages/DoctorDashBoard/Profile';

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='bg-gray-100'>
      <ToastContainer />
      <Navbar />
      <Routes>
        {aToken && (
          <Route path='/' element={<Layout />} >
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointment' element={<Appointment />} />
            <Route path='/add-doctor' element={<AddDoctors />} />
            <Route path='/doctorlist' element={<DoctorList />} />
            <Route path='/setting' element={<Setting />} />
          </Route>
        )}
        {/* Doctor routes */}
        {dToken && (
          <Route path='/' element={<Layout />}>
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<Appointments />} />
            <Route path='/doctor-profile' element={<Profile />} />
          </Route>
        )}
        {!aToken && !dToken && <Route path='*' element={<Login />} />}
      </Routes>
    </div>
  )
}

export default App