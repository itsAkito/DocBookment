// import { required } from "joi";
import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
    },
    date: {
        type: String, required: true
    },
    slot: {
        type: String, required: true
    },
    status: {
        type: String, enum: ['booked', 'cancelled', 'completed'], required: true
    },
    fees: {
        type: String, required: true
    },
    paymentStatus:{
        type:String,enum:['pending','completed'],default:'pending'
    },
    createdAt: {
        type: Date, default: Date.now
    }
})
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema)
export default Appointment