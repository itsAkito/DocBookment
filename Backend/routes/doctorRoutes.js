import express from'express'
import authDoctor from '../middlewares/authDoctor.js';
// import getAllDoctors from '../controllers/doctorController.js'
import {cancelAppointment, completedlAppointment, doctorlist, getDoctorById, getDoctorProfile, loginDoctor, totalAppointments} from '../controllers/doctorController.js'

const router=express.Router();
router.get('/list',doctorlist)
router.post('/login',loginDoctor)
router.get('/profile',authDoctor,getDoctorProfile)
router.get('/appointments', authDoctor,totalAppointments)
router.post('/cancel',authDoctor,cancelAppointment)
router.post('/complete',completedlAppointment)
router.get('/:id',getDoctorById)

export default router