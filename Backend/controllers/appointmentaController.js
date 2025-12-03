import mongoose from "mongoose";
import Appointment from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

export const createApppointment = async (req, res) => {

    try {
        const { doctorId, date, slot } = req.body;
        const userId = req.user._id;
        const doctor = await Doctor.findById(req.body.doctorId);
        if (!doctor) {
            console.log('Received doctorId:', doctorId);
            return res.status(404).json({ success: false, message: "Doctor not found" })
        }
        if (!doctor.available) {
            return res.status(400).json({ success: false, message: 'Doctor is currently unavailable' })
        }

        const existingAppoinment = await Appointment.findOne({
            doctor: doctorId, date,
            slot,
            status: { $ne: 'cancelled' }
        });
        if (existingAppoinment) {
            return res.status(404).json({ success: false, message: 'slot is already booked' })
        }
        const appointment = await Appointment.create({
            doctorId, userId, date, slot,
            status: 'booked',
            fees: doctor.fees,
            paymentStatus: 'pending'
        })
        res.status(201).json({
            success: true, appointmentID: appointment._id,
            appointment
        })
    }
    catch (err) {
        console.error('Appointment creation error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}
export const getAppointmentByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const appointments = await Appointment.find({ userId: new mongoose.Types.ObjectId(userId) }).populate('doctorId')

        const normalized = appointments.map(appt => {
            const doctor = appt.doctorId?.toObject?.() || {}
            const user = appt.userId?.ObjectId?.() || {}
            // doctor.image=`${req.protocol}://${req.get('host')}${doctor.image}`
            doctor.image = doctor.image; // leave Cloudinary URLs untouched
            return {
                ...appt.toObject(),
                doctor,
                user
            }
        });
        res.json({ success: true, appointments: normalized })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: err.message })
    }
}
export const getAppointmentByDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const appointments = await Appointment.find({ doctorId }).populate('userId')
        res.json({ success: true, appointments })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: err.message })
    }
}
export const cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false, message: 'Appointment not found'
            })
        }
        if (appointment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" })
        }
        // appointment.status = 'cancelled'
        await Appointment.findByIdAndDelete(appointmentId, { cancelled: true })
        res.json({ success: true, message: 'Appointment cancelled successfully' });
    }
    catch (error) {
        console.error('Cancel error:', error)
        res.json({ success: false, message: 'Server error' })
    }
}
