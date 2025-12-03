import express from 'express'
import {createUserProfile, getUserProfile, registerUser, updateProfile} from '../controllers/authController.js'
import {loginUser} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authmiddleware.js';
import upload from '../middlewares/multer.js';
import { getAppointmentByUser } from '../controllers/appointmentaController.js';


const registerRouter=express.Router()
registerRouter.post("/register",registerUser)
registerRouter.post('/login',loginUser)
registerRouter.post('/create-profile',authMiddleware,upload.single('image'),createUserProfile);
registerRouter.get('/users-profile',authMiddleware,getUserProfile)
registerRouter.post('/updated-profile',upload.single('image'),authMiddleware,updateProfile)
registerRouter.get('/:userId',authMiddleware,getAppointmentByUser)
export default registerRouter;