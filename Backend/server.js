import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
// import router from './routes/doctorRoutes.js'
import router from './routes/doctorRoutes.js'
import routerAppointment from './routes/appointmentRoutes.js'
import registerRouter from './routes/auth.js'
import path from 'path'
import {fileURLToPath} from 'url'
//config

const app=express()
const port=process.env.PORT||5000
connectDB()
connectCloudinary();
// config();
//middlewares
app.use(express.json());
app.use(cors());
// app.use('/uploads',express.static(path.join(_dirname,'uploads')))
//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/user',registerRouter)

app.use('/api/doctors',router)
app.use('/api/appointments',routerAppointment)
app.get('/',(req,res)=>{
    res.send("Backend runing" )
})
app.listen(port,()=>console.log("Server started",port))