import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const backendUrl1 = import.meta.env.VITE_BACKEND_URL

    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);
    const fetchAppointment = async () => {
        try {
            setLoading(true)
            const res = await axios.get(backendUrl1 + '/api/doctors/appointments', {
                headers: {
                    dtoken: dToken
                }
            })
            if (res.data.success) {
                setAppointments(res.data.appointments)

            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching appointments")
        }
        setLoading(false)
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const res = await axios.post(backendUrl1 + '/api/doctors/cancel', { appointmentId: appointmentId },
                {
                    headers: {
                        dtoken: dToken
                    }
                })
            if (res.data.success) {
                toast.success("Appointment cancelled");
                fetchAppointment();

            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.error(err);
            toast.error("Error cancelling appointments")
        }
    }
    const fetchDoctorProfile = async () => {
        try {
            const res = await axios.get(backendUrl1 + '/api/doctors/profile',
                {
                    headers: { dtoken: dToken }
                })
            if (res.data.success)
                setDoctor(res.data.doctor);
            // console.log("Doctor from response:", res.data.doctor);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching doctor profile")
        }
    }

    useEffect(() => {

        if (dToken) {
            localStorage.setItem("dToken", dToken);
            fetchDoctorProfile()
            fetchAppointment()
        } else {
            localStorage.removeItem("dToken")
        }
    }, [dToken])
    const totalAppointments = appointments.length;
    const uniquePatients = new Set(appointments.map((a) => a.userId)).size;
    const latestAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const value = {
        dToken,
        setDToken,
        backendUrl1,
        appointments,
        setAppointments,
        loading,
        setLoading,
        cancelAppointment,
        fetchAppointment,
        totalAppointments,
        uniquePatients,
        latestAppointments, doctor, setDoctor
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider
export const useDoctorContext = () => {
    return useContext(DoctorContext)
}