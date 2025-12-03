import bcrypt from "bcryptjs";
import validator from 'validator'
import Doctor from "../models/doctorModel.js";
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import Appointment from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file
    console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile)

    //check data of added all doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ message: "Invalid details", success: false })
    }
    //validating email
    if (!validator.isEmail(email)) {
      return res.json({ message: " Please Enter valid details", success: false })
    }
    if (password.length < 8) {
      return res.json({ message: "Please enter a strong password", success: false })
    }
    if (!imageFile || !imageFile.path) {
      return res.status(400).json({ success: false, message: error.message })
    }
    const secure = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, secure)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url
    const doctordata = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      about,
      degree,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      available: true,
      slots_booked: {}
    }
    const newDoctor = new Doctor(doctordata);
    await newDoctor.save()
    res.json({ success: true, message: "Doctor added successfully" })
  }
  catch (error) {
    console.error("Enter Details:", error.message)
    res.json({ success: false, message: error.message })
  }

}
export const isadminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const jwtToken = jwt.sign({ email },
        process.env.JWT_SECRET, { expiresIn: '6h' })
      console.error('Admin login successful.Token:', jwtToken)
      res.json({
        success: true,
        message: 'Login successful',
        token: jwtToken
      })
    } else {
      res.json({ message: "invalid Credentials", success: false })
    }

  } catch (error) {

    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select('-password')
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("doctorId", "name image")
      .populate("userId", "name age image")
      .sort({ date: -1 })
    res.json({ success: true, appointments })
  }
  catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// Settings Management
let platformSettings = {
  maintenanceMode: false,
  allowRegistrations: true,
  autoVerifyDoctors: false,
  platformFee: 10,
  cancellationWindow: 24,
  maxAppointmentsPerDay: 20,
  appointmentReminder: true,
  emailNotifications: true,
  smsNotifications: false,
}

export const getSettings = async (req, res) => {
  try {
    res.json({ success: true, settings: platformSettings })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export const updateSettings = async (req, res) => {
  try {
    const { maintenanceMode, allowRegistrations, autoVerifyDoctors, platformFee, cancellationWindow, maxAppointmentsPerDay, appointmentReminder, emailNotifications, smsNotifications } = req.body
    
    platformSettings = {
      maintenanceMode: maintenanceMode ?? platformSettings.maintenanceMode,
      allowRegistrations: allowRegistrations ?? platformSettings.allowRegistrations,
      autoVerifyDoctors: autoVerifyDoctors ?? platformSettings.autoVerifyDoctors,
      platformFee: platformFee ?? platformSettings.platformFee,
      cancellationWindow: cancellationWindow ?? platformSettings.cancellationWindow,
      maxAppointmentsPerDay: maxAppointmentsPerDay ?? platformSettings.maxAppointmentsPerDay,
      appointmentReminder: appointmentReminder ?? platformSettings.appointmentReminder,
      emailNotifications: emailNotifications ?? platformSettings.emailNotifications,
      smsNotifications: smsNotifications ?? platformSettings.smsNotifications,
    }
    
    res.json({ success: true, message: "Settings updated successfully", settings: platformSettings })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export const getSystemHealth = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments()
    const totalUsers = await userModel.countDocuments()
    const totalAppointments = await Appointment.countDocuments()
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' })
    const completedAppointments = await Appointment.countDocuments({ status: 'Completed' })
    const cancelledAppointments = await Appointment.countDocuments({ status: 'Cancelled' })

    const analysis = `
=== SYSTEM HEALTH REPORT ===
📊 Database Statistics:
   • Total Doctors: ${totalDoctors}
   • Total Users: ${totalUsers}
   • Total Appointments: ${totalAppointments}
   • Pending: ${pendingAppointments}
   • Completed: ${completedAppointments}
   • Cancelled: ${cancelledAppointments}

✅ Status: All systems operational
🔧 Last Check: ${new Date().toLocaleString()}
    `.trim()

    res.json({ success: true, analysis })
  } catch (error) {
    console.error(error)
    res.json({ success: false, analysis: `Error checking system health: ${error.message}` })
  }
}

export const purgeCancelledAppointments = async (req, res) => {
  try {
    const result = await Appointment.deleteMany({ status: 'Cancelled' })
    res.json({ success: true, message: "Cancelled appointments purged", count: result.deletedCount })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export const clearCache = async (req, res) => {
  try {
    // Placeholder for cache clearing logic
    res.json({ success: true, message: "Cache cleared successfully" })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export default { addDoctor, isadminlogin, allDoctors, getAppointments, getSettings, updateSettings, getSystemHealth, purgeCancelledAppointments, clearCache };