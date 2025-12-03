
// import React, { useState } from "react";
// // import mockApi, { changePassword } from "../../../Backend/mock/mockapi";

// const Setting = () => {
//   const [profile, setProfile] = useState({
//     name: 'Jayant Kumar',
//     email: 'abcde@123gmail.com',
//     password: '12345678'
//   });
//   const [notifications, setNotifications] = useState({
//     email: true,
//     sms: false
//   });
//   const [currentPassword, setCurrentPassword] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [pwMessage, setPwMessage] = useState('')
//   const [pwError, setPwError] = useState('')
//   const [saving, setSaving] = useState('')

//   const handleChangePassword = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value })
//   }
//   const toggleNotification = (key) => {
//     setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
//   }
//   const passwordStrength = (pwd) => {
//     if (!pwd)
//       return 0;
//     let score = 0;
//     if (pwd.length >= 8) score++
//     if (/[A-Z]/.test(pwd)) score++;
//     if (/[a-z]/.test(pwd)) score++;
//     if (/[^A_Za-z0-9]/.test(pwd)) score++
//     return score;
//   }
//   const validatePasswordClient = () => {
//     setPwError('')
//     if (!currentPassword) return 'Enter current password'
//     if (newPassword.length < 8) return 'New password must be at least 8 characters'
//     if (newPassword !== confirmPassword) return 'New password and confirm do not match'
//     const score = passwordStrength(newPassword)
//     if (score < 3) return 'Password should include uppercase, number, and a special character for stronger security'
//     return null
//   }
//   const handleProfileChange = async (e) => {
//     e.preventDefault()
//     setPwMessage('')
//     const clientError = validatePasswordClient()
//     if (clientError) {
//       setPwError(clientError)
//       return;
//     }
//     setSaving(true)
//     try {
//       const userId = 1;
//       const res = await changePassword(currentPassword, profile.password, userId, newPassword)
//       setPwMessage(res.message || 'updated password')
//       setNewPassword('')
//       setCurrentPassword('')
//       setSaving(false)
//       setConfirmPassword('')
//     } catch (err) {
//       setPwError(err.message || 'Password are invalid')
//     } finally {
//       setSaving(false)
//     }
//   }
//   return (
//     <div className='mx-auto w-full bg bg-gradient-to-r from-blue-300 rounded-lg to-blue-100 mt-8 flex flex-col justify-center shadow'>
//       <h2 className=' w-full p-8 py-4 text-3xl font-bold mt-10 rounded-lg text-blue-700'>Setting</h2>
//       <div className='grid grid-col-1 md:grid-col-3 gap-6'>
//         <div className='md:col-span-1 rounded-lg shadow max-w-6xl bg-blue-100 m-8 p-6'>
//           <div className=' flex items-center gap-4'>
//             <div className='rounded-full bg-blue-300 text-2xl text-white w-16 h-16 p-4 font-medium flex items-center justify-center'>{profile.name.split('').map(n => n[0]).slice(0, 2).join('')}</div>
//             <div>
//               <div className='text-lg font-semibold'>{profile.name}</div>
//               <div className='text-lg text-gray-700'>{profile.email}</div>
//             </div>

//           </div>
//           <div className='mt-6'>
//             <h4 className='text-gray-700 font-semibold'>Quiks Notifications</h4>
//             <label className='flex items-center justify-between bg-gray-100 rounded p-2 mt-4 shadow'>
//               <span className='text-gray-700'>Email Notification</span>
//               <input type='checkbox' checked={notifications.email} onChange={() => toggleNotification('email')}>
//               </input>
//             </label>
//             <div className='mt-4'>
//               <div className='flex items-center justify-between bg-gray-100 rounded p-2 shadow'>
//                 <label className='text-gray-700'>SMS Notification</label>
//                 <input type='checkbox' checked={notifications.sms} onChange={() => toggleNotification('sms')}>
//                 </input>
//               </div>
//             </div>
//           </div>
//           <div className=' md:col-span-2 rounded-lg shadow bg-blue-50'>
//             <section className='mt-6 p-6'>
//               <h4 className='text-gray-700 font-semibold'>Profile</h4>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
//                 <div className=' mx-w-auto'>
//                   <label className='text-lg block text-gray-700'> First Name*
//                   </label>
//                   <input
//                     id="name"
//                     name='name'
//                     value={profile.name}
//                     onChange={handleProfileChange}
//                     className='  text-gray-800 bg-blue-100 border-2 
//           border-blue-400 rounded-lg px-4 py-2 mt-6 focus:outline-none focus:ring-2
//           focus:ring-blue-500 '></input>
//                 </div>
//                 <div className=' mx-w-auto'>
//                   <label className='text-lg block  text-gray-700'>Email*
//                   </label>
//                   <input
//                     id="email"
//                     name='email'
//                     value={profile.email}
//                     onChange={handleProfileChange}
//                     className='  text-gray-800 bg-blue-100 border-2 
//           border-blue-400 rounded-lg px-4 py-2 mt-6 focus:outline-none focus:ring-2
//           focus:ring-blue-500 '></input>
//                 </div>
//                 <div className='flex items-center justify-between'>
//                   <button className='mt-10 h-10 bg-gradient-to-r from-blue-400 to-blue-100 text-gray-700 px-4 py-2 border-2 border-blue-500 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'>
//                     Save Profile
//                   </button>
//                 </div>
//               </div>
//             </section>
//           </div>
//           <div className=' bg-blue-50 rounded-lg mt-6 shadow'>
//             <section className='p-6 '>
//               <form onSubmit={handleChangePassword}>
//                 <h4 className='font-medium text-gray-700 '>Change Password</h4>
//                 <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
//                   <div className='mt-4'>
//                     <label className='text-lg text-gray-700 block '>Current Password</label>
//                     <input type='password'
//                       id="currentPassword"
//                       name="currentPassword"
//                       value={currentPassword}
//                      onChange={(e) => setCurrentPassword(e.target.value)}
//                       autoComplete="current-password"
//                       placeholder='Enter your Password'
//                       className='rounded-lg bg-blue-200 text-gray-800 shadow px-4 py-2 mt-4 border-2 border-blue-500 focus:outline-none  focus:ring-2 focus:ring-blue-500' />
//                   </div>
//                   <div className='mt-4'>
//                     <label className='text-lg text-gray-700 block '>New Password</label>
//                     <input type='password'
//                       id="newPassword"
//                       name="newPassword"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" placeholder='Enter your New Password' className='rounded-lg bg-blue-200 text-gray-800 shadow px-4 py-2 mt-4 border-2 border-blue-500 focus:outline-none  focus:ring-2 focus:ring-blue-500' />
//                   </div>
//                   <div className='mt-4'>
//                     <label className='text-lg text-gray-700 block '>Confirm Password</label>
//                     <input type='password'
//                     id="comfirmPassword" 
//                     name="confirmPassword"
//                     value={confirmPassword} 
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                      placeholder='Enter your New Password' 
//                      autoComplete="confirm-password" 
//                     className='rounded-lg bg-blue-200 text-gray-800 shadow px-4 py-2 mt-4 border-2 border-blue-500 focus:outline-none  focus:ring-2 focus:ring-blue-500' />
//                   </div>
//                   <div className='flex items-center gap-3'>
//                     <div className='mt-4 w-full'>
//                       <label className='text-lg text-gray-700 block '>Strength</label>
//                       <div className='rounded h-2 overflow-hidden bg-gray-300'>
//                         <div style={{ width: `${(passwordStrength(newPassword) / 4) * 100}%` }} className={`h-full ${passwordStrength(newPassword) >= 3 ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
//                       </div>
//                       <div className='text'>{passwordStrength(newPassword) >= 3 ? 'Strong' : 'weak'}</div>
//                     </div>
//                   </div>
//                   {pwError && <p className='mt-4 text-red-500 text-medium'>{pwError}</p>}
//                   {pwMessage && <p className='mt-4 text-green-500 text medium'>{pwMessage}</p>}
//                   <div className='flex items-center justify-between'>
//                     <button type='submit' disabled={saving} className='mt-12 h-10 bg-gradient-to-r from-blue-400 to-blue-100 text-gray-700 px-4 py-2 border-2
//                      border-blue-500 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disaled:opacity-50'>
//                       {saving ? 'Saving...' : 'update Password'}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default Setting



import React, { useState } from "react";
import { User, Bell, Lock, Check, AlertTriangle } from 'lucide-react';

const Setting = () => {
  // --- State Management ---
  const [profile, setProfile] = useState({
    name: 'Jayant Kumar',
    email: 'abcde@123gmail.com',
    role: 'Doctor'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    message: '',
    error: ''
  });

  // --- Handlers ---

  // Handle Profile Inputs
  const handleProfileInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle Password Inputs
  const handlePasswordInput = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Toggle Notifications
  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate Password Strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++; // Added number check
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  // Save Profile Logic (Mock)
  const handleSaveProfile = async () => {
    setStatus({ loading: true, message: '', error: '' });
    
    // Simulate API call
    setTimeout(() => {
      setStatus({ loading: false, message: 'Profile updated successfully!', error: '' });
      // Clear message after 3 seconds
      setTimeout(() => setStatus(prev => ({ ...prev, message: '' })), 3000);
    }, 1500);
  };

  // Update Password Logic
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    // Validation
    if (!passwords.current) {
      setStatus({ loading: false, message: '', error: 'Please enter your current password.' });
      return;
    }
    if (passwords.new.length < 8) {
      setStatus({ loading: false, message: '', error: 'New password must be at least 8 characters.' });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setStatus({ loading: false, message: '', error: 'New passwords do not match.' });
      return;
    }
    
    // Simulate API Call
    setTimeout(() => {
      // Mock Success
      setStatus({ loading: false, message: 'Password changed successfully!', error: '' });
      setPasswords({ current: '', new: '', confirm: '' });
      // Clear message
      setTimeout(() => setStatus(prev => ({ ...prev, message: '' })), 3000);
    }, 1500);
  };

  const strengthScore = getPasswordStrength(passwords.new);

  return (
    <div className='mt-20 min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
      
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Account Settings</h2>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          
          {/* --- LEFT COLUMN: Profile Card & Notifications --- */}
          <div className='space-y-8'>
            
            {/* Profile Summary Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center'>
              <div className='w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4'>
                {profile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <h3 className='text-xl font-bold text-gray-800'>{profile.name}</h3>
              <p className='text-gray-500 text-sm'>{profile.email}</p>
              <span className='mt-3 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full'>
                {profile.role}
              </span>
            </div>

            {/* Notifications Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
              <div className='flex items-center gap-2 mb-6'>
                <Bell className='text-blue-500 w-5 h-5' />
                <h4 className='font-bold text-gray-800'>Notifications</h4>
              </div>
              
              <div className='space-y-4'>
                <label className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group'>
                  <span className='text-gray-700 font-medium group-hover:text-blue-600'>Email Notifications</span>
                  <div className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${notifications.email ? 'bg-blue-500' : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${notifications.email ? 'translate-x-5' : ''}`}></div>
                  </div>
                  <input type='checkbox' className='hidden' checked={notifications.email} onChange={() => toggleNotification('email')} />
                </label>

                <label className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group'>
                  <span className='text-gray-700 font-medium group-hover:text-blue-600'>SMS Notifications</span>
                  <div className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${notifications.sms ? 'bg-blue-500' : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${notifications.sms ? 'translate-x-5' : ''}`}></div>
                  </div>
                  <input type='checkbox' className='hidden' checked={notifications.sms} onChange={() => toggleNotification('sms')} />
                </label>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Edit Profile & Password --- */}
          <div className='lg:col-span-2 space-y-8'>
            
            {/* Edit Profile Section */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
                <User className='text-blue-500 w-5 h-5' />
                <h4 className='text-xl font-bold text-gray-800'>Profile Details</h4>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={profile.name}
                    onChange={handleProfileInput}
                    className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    value={profile.email}
                    onChange={handleProfileInput}
                    className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                  />
                </div>
              </div>

              <div className='mt-8 flex justify-end'>
                <button 
                  onClick={handleSaveProfile}
                  disabled={status.loading}
                  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {status.loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Change Password Section */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
                <Lock className='text-blue-500 w-5 h-5' />
                <h4 className='text-xl font-bold text-gray-800'>Security</h4>
              </div>

              <form onSubmit={handleUpdatePassword} className='space-y-5'>
                
                {/* Current Password */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Current Password</label>
                  <input
                    type='password'
                    name='current'
                    value={passwords.current}
                    onChange={handlePasswordInput}
                    placeholder='••••••••'
                    className='w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  />
                </div>

                {/* New Password Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>New Password</label>
                    <input
                      type='password'
                      name='new'
                      value={passwords.new}
                      onChange={handlePasswordInput}
                      placeholder='At least 8 characters'
                      className='w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Confirm Password</label>
                    <input
                      type='password'
                      name='confirm'
                      value={passwords.confirm}
                      onChange={handlePasswordInput}
                      placeholder='Confirm new password'
                      className='w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    />
                  </div>
                </div>

                {/* Password Strength Meter */}
                <div className='bg-gray-50 p-4 rounded-lg mt-2'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-xs font-semibold text-gray-500 uppercase'>Password Strength</span>
                    <span className={`text-xs font-bold ${strengthScore >= 3 ? 'text-green-600' : strengthScore >= 2 ? 'text-yellow-600' : 'text-red-500'}`}>
                      {strengthScore >= 4 ? 'Very Strong' : strengthScore >= 3 ? 'Strong' : strengthScore >= 2 ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                  <div className='flex gap-1 h-1.5'>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div 
                        key={level} 
                        className={`flex-1 rounded-full transition-colors duration-300 ${
                          strengthScore >= level 
                            ? (strengthScore >= 4 ? 'bg-green-500' : strengthScore >= 3 ? 'bg-green-400' : 'bg-yellow-400') 
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className='text-xs text-gray-400 mt-2'>
                    Use 8+ chars, mix of uppercase, lowercase, numbers & symbols.
                  </p>
                </div>

                {/* Status Messages */}
                {status.error && (
                  <div className='flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm'>
                    <AlertTriangle className="w-5 h-5" />
                    {status.error}
                  </div>
                )}
                {status.message && (
                  <div className='flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm'>
                    <Check className="w-5 h-5" />
                    {status.message}
                  </div>
                )}

                <div className='flex justify-end pt-4'>
                   <button 
                    type='submit'
                    disabled={status.loading}
                    className='bg-gray-900 hover:bg-black text-white font-semibold py-2 px-6 rounded-lg transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {status.loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting