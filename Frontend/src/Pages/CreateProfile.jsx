import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

const CreateProfile = () => {
    const{createUserProfile,loading}=useAppContext()
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
    name:'',
    phone:''
    ,gender:'',
    age:'',
    city:'',
    state:'',
    country:''
    })
    const [image,setImage]=useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefaults();
        const form=new FormData()
        Object.keys(formData).forEach(key=>{
            form.append(key,formData[key]);
        })
    
    if(image){
        form.append('image',image)
    }
    const result=await createUserProfile(form)
    if(result.success){
        navigate('/profile');
    }
}
    
    return (
        <div>
            <h2>Create Your Profile</h2>
            <form onSubmit={ handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='from-group'>
                        <label className='block'></label>
                        <input type='text' value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className='form-input w-full rounded border-gray-400' required />
                    </div>

                    <div className='form-group'>
                        <lable className=" block  text-gray-800 mb-1"></lable>
                        <input type='tel' value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} className='form-input w-full rounded border-gray-400' required />
                    </div>
                    <div className='form-group'>
                        <lable className="block text-gray-800 mb-1"></lable>
                        <input type='number' value={formData.age} onChange={(e)=>setFormData({...formData,age:e.target.value})} className='form-input w-full rounded border-gray-400' required />
                    </div>
                            <div className='from-group'>
                        <label className='block'></label>
                        <input type='text' value={formData.city} onChange={(e)=>setFormData({...formData,city:e.target.value})} className='form-input w-full rounded border-gray-400' required />
                    </div>

                    <div className='form-group'>
                        <lable className=" block  text-gray-800 mb-1"></lable>
                        <input type='tel' value={formData.state} onChange={(e)=>setFormData({...formData,state:e.target.value})} className='form-input w-full rounded border-gray-400' required />
                    </div>
                    <div className='form-group'>
                        <lable className="block text-gray-800 mb-1"></lable>
                        <input type='number' value={formData.country} onChange={(e)=>setFormData({...formData,country:e.target.value})} className='form-input w-full rounded border-gray-400' required />
                    </div>
                    <div className='form-group'>
                        <lable className="block   text-gray-800 mb-1"></lable>
                        < select
                        value={formData.gender}  onChange={(e)=>setFormData({...formData,gender:e.target.value})}
                            className='form-select w-full rounded text-gray-800'>
                            <option value=""> Select Category of Gender</option>
                            <option value="Male"> Male</option>
                            <option value="Female">Female</option>
                            <option value=" Other"> Other</option>
                        </select>
                    </div>
                    <div className='form-group col-span-2'>
                        <label className='block text-gray-800 mb-1'></label>
                        <input type='file'
                            onChange={(e) => setImage(e.target.files[0])}
                            className='form-input w-full' accept='image/*' />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button type='submit'
                        disabled={loading}
                        className='bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700'>
                        {loading ? 'Creating...' : 'Create Profile'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProfile