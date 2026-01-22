import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: ''},
    age:{type:Number,required:true},
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, default: "Not Selected" },
    // dob: { type: String, default: "Not Selected" },
    phone: { type: String, required:true},

},{timestamps:true})


const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel
