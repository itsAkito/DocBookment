import express from 'express'
import {  cancelAppointment, createApppointment, getAppointmentByDoctor,
getAppointmentByUser } from '../controllers/appointmentaController.js';
import { protect } from '../middlewares/authAppointment.js';

const routerAppointment =express.Router()

routerAppointment.post('/',protect,createApppointment);

routerAppointment.get('/user/:userId',protect,getAppointmentByUser)
routerAppointment.get('/doctor',protect,getAppointmentByDoctor)
routerAppointment.delete('/:id',protect,cancelAppointment)

export default routerAppointment