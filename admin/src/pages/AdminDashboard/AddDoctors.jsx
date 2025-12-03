import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctors = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState()
    const [fees, setFees] = useState('')
    const [speciality, setSpeciality] = useState('General Physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [about, setAbout] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)
    const onSubmithandler = async (e) => {
        e.preventDefault();
        try {
            const doctorData = {
                name,
                email,
                password,
                experience,
                fees,
                speciality,
                degree,
                address: {
                    line1: address1,
                    line2: address2,
                },
                about,
                image: docImg,
            };
            console.log("Full Doctor Data:", doctorData);

            const formData = new FormData()
            formData.append('image', docImg)
            //  if (docImg) {
            //     formData.append("image", docImg);
            // }
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            // formData.append('image', docImg)
            formData.forEach((value, key) => {
                console.log(`${key}:${value}`)
            })
            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
                headers: {
                    aToken
                }
            })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
                setExperience('');
                setSpeciality('General Physician');
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("something went wrong")
            console.error(err)
        }
    }
    return (
        <form onSubmit={onSubmithandler} className='w-full p-6'>
            <p className='mb-4 font-medium text-xl'>Add Doctor</p>
            <div className='bg-white px-8 py-6 border rounded w-full max-w-full max-h[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-800 '>
                    <label htmlFor='doc-img'>
                        <img className='w-16 bg-gray-200 rounded-full cursor-pointer ' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt='' />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                    <p>Upload Doctor <br />Picture</p>
                </div>
                <div className='flex flex-col lg-flex-row items-start gap-10 text-gray-900'>
                    <div className='w-full lg:flex-1 flex flex-col gap-5'>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-4 py-2' type='text' placeholder='Name' required />
                        </div>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-4 py-2' type='email' placeholder='Email' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-'>
                            <p>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-4 py-2' type='password' placeholder='Password' required />
                        </div>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Doctor Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-4 py-2' name=" " id="">
                                <option value="1 year" >1 Year </option>
                                <option value="2 year" >2 Year </option>
                                <option value="3 year" >3 Year </option>
                                <option value="4 year" >4 Year </option>
                                <option value="5 year" >5 Year </option>
                                <option value="6 year" >6 Year </option>
                                <option value="7 year" >7 Year </option>
                                <option value="8 year" >8 Year </option>
                                <option value="9 year" >9 Year </option>
                                <option value="10year" >10 Year </option>
                                {/* <option value="1 year" >1 Year </option> */}
                            </select>
                        </div>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-4 py-2' type='number' placeholder='fees' required />
                        </div>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-4 py-2'>
                                <option value='General physician'>General physician</option>
                                <option value='Gynecologist'>Gynecologist</option>
                                <option value='Dermatologist'>Dermatologist</option>
                                <option value='Pediatricians'>Pediatricians</option>
                                <option value='Neurologist'>Neurologist</option>
                                <option value='Gastroenlogist'>Gastroenlogist</option>
                            </select>
                        </div>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-4 py-2' type='text' placeholder='Education' required />
                        </div>
                        <div className=' flex-1 flex flex-col gap-2'>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-4 py-2' type='text' placeholder='address 1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-4 py-2' type='text' placeholder='address 2' required />
                        </div>
                    </div>
                    <div className=' flex-1 flex flex-col gap-2' >
                        <p className='mt-4 mb-3'>About Doctor</p>
                        <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-5 py-2 border rounded' type='text' placeholder='write about doctor' rows={5} required />
                    </div>
                    <button type='submit' className=' font-medium text-center text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 cursor-pointer'>Add Doctor</button>
                </div>
            </div>
        </form>
    )
}

export default AddDoctors