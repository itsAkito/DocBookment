import express, { response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import Appointment from '../models/appointmentModel.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ 
        success: false, 
        message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ 
        success: false,
        message: "Please enter the valid mail" });
    }
    if (password.length < 8) {
      return res.json({ 
        
        success: false,
         message: "Please enter a strong password" });
    }
    const existingUser=await userModel.findOne({email})
    if(existingUser){
      return res.status(409).json(
        {
        success:false,
        message:"Email already exists"
      })
    }
    const isMatch = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, isMatch)
    const userData = {
      name, email, password: hashedPassword,
      phone:"",age:null,gender:"",city:"",state:"",country:"",image:""
    }
    const newRegistor = new userModel(userData)
    const register = await newRegistor.save()
    const token = jwt.sign({ id: register._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ success: true, token,
      user:{
        id:register._id,
        name:register.name,
        email:register.email
      }
     })
  } catch (error) {
    console.log('Registration error:',error);
    return res.status(500).json({ success: false, message: error.message })

  }
}
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({ success: true, token })
  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: "server error" })
  }
}
export const createUserProfile=async(req,res)=>{
  try{
    const userId=req.userId;
    const{name,phone,age,city,state,country,gender}=req.body;
    const imageFile=req.file;
    
    if(!name||!phone||!age||!gender){
      return res.status(400).json({
        success:false,
        message:"Required fields missing"
      })
    }

  const existingUser=await userModel.findById(userId);
  if(!existingUser){
    return res.status(404).json({
      success:false,
      message:'user not found'
    })
  }
  const profileData={
    name,phone,age:parseInt(age),
    gender,city:city||'',
    state:state||'',
    country:country||''
  }
  if(imageFile){
    try{
      const imageUpload =await cloudinary.uploader.upload(imageFile.path,{
        folder:'doctor-app/profiles',
        width:500, 
        height:500,
        crop:'fill'
      })
      profileData.image=imageUpload.secure_url;
    }catch(error){
      console.error('imag upload error:',error)
      return res.status(500).json({
        success:false,
        message:'Error uploading image'
      })
    }
  }
const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            profileData,
            { new: true }
        ).select('-password');
if(!updatedUser){
        return res.json({
          success:false,
          message:"user Not found"
        })
      }
      res.status(200).json({
            success: true,
            message: 'Profile created successfully',
            userData: updatedUser
        });
  }catch(error){
    console.error("create profile error:",error);
    res.status(500).json({
      success:false,
      message:'Error creating profile'
    })
  }
}
export const getUserProfile = async (req, res) => {
  try {
    const userId  = req.userId;
    const userData = await userModel.findById(userId).select('-password').lean();
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'user not found'
      })
    }
    res.status(200).json(
      { success: true, userData }
    )
  } catch (error) {
    console.error('error fetching user profile:', error);
    res.json({ success: false, message: error.message })

  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId=req.userId
    const { name, phone, age,
      city, state, country, gender } = req.body;
    const imageFile = req.file;
    //validated require details 
    if (
      !name ||
      !age ||
      !city ||
      !state ||
      !country ||
      !gender ||
      !phone
    ) {
      return res.json({ success: false, message: "Details missing" })
    }
    // create an updated object object
    const updateData = {
      name, phone, age, city,
      state, country, gender
    }
    // userModel.findByIdAndUpdate(userId, { name, phone, age, city, state, country, gender, ...req.file && { image: req.file.path } })
    if (imageFile) {
      try {

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          folder: 'doctor-app/profiles',
          width: 500,
          height: 500,
          crop: 'fill'
        });
        updateData.image = imageUpload.secure_url
        // await userModel.findByIdAndUpdate(userId, { image: imageURL })
      }catch (uploadError) {
        console.error('cloudinary error:', uploadError)
        return res.status(500).json({
        success: false, message: 'Error uploading image'
        })
      }
    }
    const updatedUser=await userModel.findByIdAndUpdate(userId,updateData,{new:true}).select('-password');

    if(!updatedUser){
      return res.status(404).json({
        success:false,
        message:'user not found'
      })
    }
      return res.status(200).json({
      success:true,
      message:"Profile updated successfully",
      user:updatedUser
      })
      // res.json({ success: true, message: "profile Updated" })
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({success: false, message: error.message })
    }
  }
  export const getAppointmentByUser=async()=>{
    try{
      const userId=req.user._id;
      const appointments=await Appointment.find({userId}).populate('doctorId');
      res.json({success:true,appointments});
    }catch(error){
      console.error('Appointmnet could not find:',error)
      res.status(500).json({success:false,message:error.message})
    }
  }