
import './App.css'
import Home from './Pages/Home.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import SearchDoctors from './Pages/SearchDoctors'
import PatientDashboard from './Pages/PatientDashboard'
import BookAppointment from './Pages/BookAppointment'
import DoctorDashboard from './Pages/AppointmentDetails.jsx'
import Navbar from './components/Navbar.jsx'
import About from './Pages/About.jsx'
import Login from './Pages/Login.jsx'
import Profile from './Pages/Profile.jsx'
import Contact from './Pages/Contact.jsx'
import Footer from './components/Footer.jsx'
// import AppointmentForm from './components/AppointmentForm.jsx'
import PrescriptionViewer from './components/PrescriptionViewer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import Setting from './Pages/Setting.jsx'
import { ToastContainer } from 'react-toastify'
import { AppContext, useAppContext } from './context/AppContext.jsx'
import DoctorDetails from './Pages/DoctorDetails.jsx'
import AppointmentDetails from './Pages/AppointmentDetails.jsx'
// import CreateProfile from './Pages/CreateProfile.jsx'


const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext();
  if (!token)
    return <Navigate to='/login' replace />;
  return children;
}

function App() {
  const { token } = useAppContext(AppContext);

  return (
    <div>
      <ScrollTop />
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/setting' element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/patientdashboard' element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
        <Route path='/doctordashboard' element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        <Route path='/search-doctors' element={<ProtectedRoute><SearchDoctors /></ProtectedRoute>} />
        <Route
          path="/bookappointment"
          element={<ProtectedRoute><BookAppointment /></ProtectedRoute>}/>
        <Route path='/bookappointment/:doctorId' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path='/doctors/:id' element={<DoctorDetails />} />
        <Route path='/appointment/:appoinmentId' element={<AppointmentDetails />} />
        <Route path='/prescriptionviewer' element={<ProtectedRoute><PrescriptionViewer /></ProtectedRoute>} />
        <Route path='/my-appointment' element={<ProtectedRoute><AppointmentDetails /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
