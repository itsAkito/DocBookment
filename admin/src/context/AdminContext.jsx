import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import e from "cors";
export const AdminContext = createContext()
const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const getAllDoctors = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors',
                {
                    headers: {
                        aToken,
                    },
                })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/change-availability", { docId }, {
                headers: {
                    aToken
                },
            });

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();

            } else {
                toast.error(data.message || "failed to change change Availability");
            }
        }
        catch (error) {
            toast.error(error.message)
        }

    }
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
                headers: {
                    aToken
                }
            })
            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)

            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    

    const uniquePatients = [
        ...new Map(appointments.map(appt => [appt.userId._id, appt.userId])).values()
    ]
    useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
      console.log("Admin Token:", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments, setAppointments, getAllAppointments,
        uniquePatients,
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider

export const useAdminContext=()=>{
    const context=useContext(AdminContext);
    if(!context){
        throw Error ("useAdminContext must be used within AdminContextProvider")
    }
    return context
}