import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()
const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_API_URL
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [appointment, setAppointment] = useState([])
    const [loadingAppointment, loadingSetAppointment] = useState(false)
    const [userId, setUserId] = useState(null)

    const getAllDoctorsData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(backendUrl + '/api/doctors/list')
            if (data.success) {
                setDoctors(data.doctors)
                // res.json(data.success)
            } else {
                // res.json({success:false,message:"data fetching failed"})
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }
    const bookedAppointment = async ({ doctorId, userId, date, slot }) => {
        if (!doctorId || !userId || !date || !slot) {
            console.warn('Missing requires fields for booking appointment');
            return { success: false, message: 'Doctor ID,User ID Date and Slot' }
        }
        const payload = {
            doctorId,
            userId,
            date,
            slot,
        }
        try {
            const data = await axios.post(
                backendUrl + '/api/appointments/', payload, {
                headers: {
                    Authorization: token,
                }
            })
            if (data.data.success) {
                toast.success("Appointment Booked successfully")
                setAppointment(data.data.appointment);
                return {
                    success: true,
                    appointmentID: data.data.appointmentID._id,
                    appointment: data.data.appointment
                }

            } else {
                toast.error(data.data.message || "Booking Failed")
                return { success: false, message: data.data.message };
            }
        } catch (err) {
            console.error('Booked Failed:', err);
            toast.error('something went wrong while booking')

        }
        // setAppointment(data.data.appointment)
    }

    const fetchAppointment = async () => {
        if (!userId) {
            return;
        }
        try {
            loadingSetAppointment(true);
            const res = await axios.get(`${backendUrl}/api/appointments/user/${userId}`, {
                headers: {
                    Authorization: token
                }
            })
            if (res.data.success) {
                const appts=res.data.appointments;
                if(Array.isArray(appts)){
                    setAppointment(appts)
                }else if(appts){
                    setAppointment([appts])
                }
                // setAppointment(res.data.appointments)
            } else {
                toast.error(res.data.message)
                setAppointment([])
            }
        } catch (err) {
            toast.error('error fetching appoinments', err)
            setAppointment([])
        }
        loadingSetAppointment(false)
    }
    const createUserProfile = async (formData) => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                backendUrl + '/api/user/create-profile', formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": 'multipart/form-data'
                    }
                }
            )
            if (data.success) {
                setUserData(data.userData);
                toast.success('Profile create successfully')
                return { success: true, data: data.userData };
            }
            toast.error(data.message)
            return { success: false, message: error.message }
        } catch (error) {
            console.error("Some issue occur in Profile creation:", error)
            toast.error(error.response?.data?.message || 'Error creating profile');
            return { success: false, message: error.message }
        }
    }
    const UsersDataProfile = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(backendUrl + '/api/user/users-profile', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            })
            if (data.success) {
                setUserData(data.userData);
                return { success: true, data: data.userData };
            } else {
                toast.error(data.message || 'Failed to fetch user profile');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.log('profile fetch error:', error);
            toast.error(error.message?.data?.message || 'Error fetching profile');
            return { success: false, message: error.message };
        }

    }
    const updatedUserProfile = async (formData) => {
        try {
            const res = await axios.post(`${backendUrl}/api/user/updated-profile`,
                formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
            if (res.data.success) {
                setUserData(res.data.userData);
                toast.success('Profile upaded successfully');
                return ({ success: true, data: res.data.userData });

            } else {
                toast.error(res.data.message);
                return ({ success: false, data: res.data.message })
            }
        } catch (error) {
            console.error("profile update error:", error)
            toast.error(error.res?.data?.message || 'Failed to update profile')
            return ({ success: false, message: error.message })
        }
    }
    useEffect(() => {
        getAllDoctorsData()
    }, [])
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);


    const value = {
        backendUrl,
        token,
        setToken,
        userData,
        doctors,
        userId, setUserId,
        selectedDoctor,
        appointment,
        setAppointment,
        loadingAppointment,
        loadingSetAppointment,
        setSelectedDoctor,
        bookedAppointment,
        getAllDoctorsData,
        fetchAppointment,
        currencySymbol,
        loading,
        setLoading,
        createUserProfile,
        UsersDataProfile, updatedUserProfile, bookedAppointment

    }

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                const res = await UsersDataProfile();
                if (res.success) {
                    setUserId(res.data._id);
                }
            } else {
                setUserData(false);
                setUserId(null)
            }
        }
        fetchUser()
    }, [token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
export const useAppContext = () => {
    return useContext(AppContext)
}