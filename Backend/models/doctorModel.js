import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: false },
    fees: { type: Number, required: true },
    address: {
        line1: { type: String, required: true },
        line2: { type: String }
    },
    date: { type: Date, required: true },
    available: { type: Boolean, default: true },
    slots_booked: { type: Object, default: {} }
}, { minimize: false })
const Doctor = mongoose.models?.Doctor || mongoose.model('Doctor', doctorSchema, 'user');
export default Doctor