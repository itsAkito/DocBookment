import express from 'express'
import {addDoctor, getAppointments, getSettings, updateSettings, getSystemHealth, purgeCancelledAppointments, clearCache}  from '../controllers/adminController.js'
import {isadminlogin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import {allDoctors} from '..//controllers/adminController.js'
import {changeAvailability} from '../controllers/doctorController.js'


const adminRouter=express.Router()
adminRouter.post('/add-doctor', authAdmin ,upload.single('image'),addDoctor)
adminRouter.post('/login',isadminlogin)
adminRouter.get('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,getAppointments)
adminRouter.get('/settings',authAdmin,getSettings)
adminRouter.put('/settings',authAdmin,updateSettings)
adminRouter.get('/system-health',authAdmin,getSystemHealth)
adminRouter.delete('/purge-cancelled',authAdmin,purgeCancelledAppointments)
adminRouter.post('/clear-cache',authAdmin,clearCache)
export default adminRouter