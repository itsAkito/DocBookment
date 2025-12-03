import Doctor from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Appointment from "../models/appointmentModel.js";
export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" })
        }

        const doctor = await Doctor.findById(docId)
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" })
        }
        doctor.available = !doctor.available
        await doctor.save({ validateModifiedOnly: true });

        res.status(200).json({
            success: true,
            message: `Doctor availablity changed to ${doctor.available ? 'Available' : 'Unavailable'}`,
            doctor,
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Internal server error" })
    }
};
export const doctorlist = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal server error" })
    }
}
export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })

        }
        res.json({ success: true, doctor })
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Error fetching doctor" })
    }
}
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email }).select("name image email password");
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });

        }
        const isPasswordMatch = await bcrypt.compare(password, doctor.password)
        if (!isPasswordMatch) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: doctor._id, email: doctor.email }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({
            success: true, token,
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                image: doctor.image
            }
        })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Internal server error' })
    }
}
export const totalAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const appointments = await Appointment.find({ doctorId }).populate('userId', ' image name email').sort({ date: -1 })
        res.json({ success: true, appointments })
    }
    catch (error) {
        console.error(error);
        res.json({
            success: false, message: "Error to fetching appointments"
        })
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" })
        }
        appointment.status = "cancelled";
        await appointment.save();
        res.json({ success:true, message: "Appointment cancelled" })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error cancelling appointment" });
    }
}

export const completedlAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" })
        }
        appointment.status = "Completed";
        await appointment.save();
        res.json({ success:true, message: "Appointment completed" })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error completed appointment" });
    }
}

export const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id).select("name email image")
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.json({ success: true, doctor })
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching to doctor profile" })
    }
}