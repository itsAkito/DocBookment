// import React, { useState, useEffect, useContext, createContext } from 'react'
// import { 
//   Settings, Shield, Users, Calendar, Activity, Save, 
//   ToggleLeft, ToggleRight, AlertTriangle, Sparkles, Loader, Database 
// } from 'lucide-react'

// // --- MOCK ADMIN CONTEXT (For Preview Purposes) ---
// // In your real app, import { AdminContext } from '../../context/AdminContext'
// const mockAdminSettings = {
//   maintenanceMode: false,
//   allowRegistrations: true,
//   autoVerifyDoctors: false,
//   platformFee: 10, // Percent
//   cancellationWindow: 24, // Hours
//   maxAppointmentsPerDay: 20,
//   systemHealth: "Optimal"
// };

// export const AdminContext = createContext({
//   aToken: "mock-admin-token",
//   settings: mockAdminSettings,
//   updateSettings: () => {},
//   backendUrl: "http://localhost:5000"
// });
// // --------------------------------------------------

// const Setting = () => {
//   // Access Context
//   const { aToken, settings: initialSettings, backendUrl } = useContext(AdminContext);

//   // Local State for Form Handling
//   const [settings, setSettings] = useState(initialSettings);
//   const [isSaving, setIsSaving] = useState(false);
//   const [aiAnalysis, setAiAnalysis] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   // Sync state if context changes (optional, good for real apps)
//   useEffect(() => {
//     setSettings(initialSettings);
//   }, [initialSettings]);

//   // Handlers
//   const handleToggle = (key) => {
//     setSettings(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSettings(prev => ({ ...prev, [name]: value }));
//   };

//   const saveSettings = async () => {
//     setIsSaving(true);
//     // Simulate API Call
//     console.log("Saving Settings to:", backendUrl, settings);
    
//     setTimeout(() => {
//       setIsSaving(false);
//       alert("System settings updated successfully.");
//     }, 1500);
//   };

//   // --- GEMINI AI INTEGRATION (Mock) ---
//   const runAIHealthCheck = async () => {
//     setIsAnalyzing(true);
//     setAiAnalysis("");
    
//     // In a real scenario, you would send system logs to Gemini here
//     // const prompt = "Analyze these server logs for anomalies...";
    
//     setTimeout(() => {
//       setAiAnalysis("Gemini Analysis: System load is balanced. Detected a 15% spike in appointments on weekends. Recommendation: Increase server capacity on Saturday mornings. No security threats detected.");
//       setIsAnalyzing(false);
//     }, 2000);
//   };

//   return (
//     <div className='min-h-screen bg-gray-50 p-6'>
      
//       {/* Header */}
//       <div className='max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
//         <div>
//           <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
//             <Settings className='w-8 h-8 text-blue-600' />
//             Admin Controller
//           </h1>
//           <p className='text-gray-500 mt-1'>Manage global application state, appointments, and permissions.</p>
//         </div>
        
//         <button 
//           onClick={saveSettings}
//           disabled={isSaving}
//           className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all disabled:opacity-50'
//         >
//           {isSaving ? <Loader className='w-5 h-5 animate-spin' /> : <Save className='w-5 h-5' />}
//           {isSaving ? "Applying..." : "Save Changes"}
//         </button>
//       </div>

//       <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>

//         {/* --- CARD 1: GLOBAL APP STATE --- */}
//         <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-1'>
//           <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
//             <Activity className='w-5 h-5 text-red-500' />
//             <h2 className='text-lg font-bold text-gray-800'>Global State</h2>
//           </div>

//           <div className='space-y-6'>
//             {/* Maintenance Mode */}
//             <div className='flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100'>
//               <div>
//                 <p className='font-semibold text-red-700'>Maintenance Mode</p>
//                 <p className='text-xs text-red-500'>Stops all user login & booking.</p>
//               </div>
//               <button onClick={() => handleToggle('maintenanceMode')} className='text-red-600 focus:outline-none'>
//                 {settings.maintenanceMode 
//                   ? <ToggleRight className='w-10 h-10 fill-current' /> 
//                   : <ToggleLeft className='w-10 h-10 text-gray-400' />}
//               </button>
//             </div>

//             {/* Registration Toggle */}
//             <div className='flex items-center justify-between'>
//               <div>
//                 <p className='font-medium text-gray-700'>Allow New Registrations</p>
//                 <p className='text-xs text-gray-500'>Doctors and Patients can sign up.</p>
//               </div>
//               <button onClick={() => handleToggle('allowRegistrations')} className='text-green-600 focus:outline-none'>
//                 {settings.allowRegistrations
//                   ? <ToggleRight className='w-10 h-10 fill-current' /> 
//                   : <ToggleLeft className='w-10 h-10 text-gray-400' />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- CARD 2: APPOINTMENT LOGIC --- */}
//         <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2'>
//           <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
//             <Calendar className='w-5 h-5 text-blue-500' />
//             <h2 className='text-lg font-bold text-gray-800'>Appointment Rules</h2>
//           </div>

//           <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            
//             {/* Platform Fee */}
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>Platform Fee (%)</label>
//               <div className='relative'>
//                 <input 
//                   type="number" 
//                   name="platformFee"
//                   value={settings.platformFee}
//                   onChange={handleChange}
//                   className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
//                 />
//                 <span className='absolute right-4 top-2 text-gray-400 font-bold'>%</span>
//               </div>
//               <p className='text-xs text-gray-500 mt-2'>Commission taken from each paid appointment.</p>
//             </div>

//             {/* Cancellation Window */}
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>Cancellation Window (Hours)</label>
//               <input 
//                 type="number" 
//                 name="cancellationWindow"
//                 value={settings.cancellationWindow}
//                 onChange={handleChange}
//                 className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
//               />
//               <p className='text-xs text-gray-500 mt-2'>Time before appointment where cancellation is free.</p>
//             </div>

//             {/* Max Appointments */}
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>Global Max Daily Slots</label>
//               <input 
//                 type="number" 
//                 name="maxAppointmentsPerDay"
//                 value={settings.maxAppointmentsPerDay}
//                 onChange={handleChange}
//                 className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- CARD 3: DOCTOR GOVERNANCE --- */}
//         <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-1'>
//           <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
//             <Shield className='w-5 h-5 text-purple-500' />
//             <h2 className='text-lg font-bold text-gray-800'>Governance</h2>
//           </div>

//           <div className='space-y-6'>
//             {/* Auto Verify */}
//             <div className='flex items-center justify-between'>
//               <div>
//                 <p className='font-medium text-gray-700'>Auto-Verify Doctors</p>
//                 <p className='text-xs text-gray-500'>Skip manual document verification.</p>
//               </div>
//               <button onClick={() => handleToggle('autoVerifyDoctors')} className='text-blue-600 focus:outline-none'>
//                 {settings.autoVerifyDoctors
//                   ? <ToggleRight className='w-10 h-10 fill-current' /> 
//                   : <ToggleLeft className='w-10 h-10 text-gray-400' />}
//               </button>
//             </div>

//             <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
//               <div className='flex items-center gap-2 text-yellow-800 font-bold mb-1'>
//                  <AlertTriangle className='w-4 h-4' /> Warning
//               </div>
//               <p className='text-xs text-yellow-700'>
//                 Enabling auto-verification may allow unverified practitioners to list services. Use with caution.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* --- CARD 4: AI SYSTEM HEALTH --- */}
//         <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2'>
//           <div className='flex items-center justify-between border-b border-gray-100 pb-4 mb-4'>
//             <div className='flex items-center gap-2'>
//               <Sparkles className='w-5 h-5 text-indigo-500' />
//               <h2 className='text-lg font-bold text-gray-800'>AI System Insight</h2>
//             </div>
//             <button 
//               onClick={runAIHealthCheck}
//               disabled={isAnalyzing}
//               className='text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-1 rounded-full hover:bg-indigo-100 transition disabled:opacity-50'
//             >
//               {isAnalyzing ? "Analyzing Logs..." : "Run Analysis"}
//             </button>
//           </div>

//           <div className='bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 min-h-[120px]'>
//             {!aiAnalysis && !isAnalyzing && (
//               <p className='text-gray-500 italic'>System awaiting analysis command...</p>
//             )}
//             {isAnalyzing && (
//               <div className='flex items-center gap-2'>
//                 <Loader className='w-4 h-4 animate-spin' />
//                 <span>Reading server logs... checking database latency...</span>
//               </div>
//             )}
//             {aiAnalysis && (
//               <p className='animate-pulse'>{aiAnalysis}</p>
//             )}
//           </div>
//         </div>

//         {/* --- CARD 5: DANGER ZONE --- */}
//         <div className='bg-white rounded-xl shadow-sm border border-red-200 p-6 lg:col-span-3'>
//            <div className='flex items-center gap-2 mb-4'>
//              <Database className='w-5 h-5 text-red-600' />
//              <h2 className='text-lg font-bold text-red-600'>Danger Zone</h2>
//            </div>
           
//            <div className='flex flex-wrap items-center gap-4'>
//               <button 
//                 onClick={() => { if(confirm("Are you sure? This will remove all Cancelled appointments.")) alert("Cleared!") }}
//                 className='px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-semibold'
//               >
//                 Purge Cancelled Appointments
//               </button>
//               <button 
//                 onClick={() => { if(confirm("Clear all system cache?")) alert("Cache Cleared!") }}
//                 className='px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-semibold'
//               >
//                 Clear System Cache
//               </button>
//            </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Setting


import React, { useState, useEffect } from 'react'
import { 
  Settings, Shield, Users, Calendar, Activity, Save, 
  ToggleLeft, ToggleRight, AlertTriangle, Sparkles, Loader, Database, Bell, Lock,Trash2
} from 'lucide-react'
import { AdminContext, useAdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const Setting = () => {
  const { aToken, backendUrl } = useAdminContext(AdminContext);
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    autoVerifyDoctors: false,
    platformFee: 10,
    cancellationWindow: 24,
    maxAppointmentsPerDay: 20,
    appointmentReminder: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch current settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${backendUrl}/api/admin/settings`, {
        headers: { atoken: aToken }
      });
      if (res.data.success) {
        setSettings(res.data.settings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: isNaN(value) ? value : Number(value) }));
  };

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      const res = await axios.put(
        `${backendUrl}/api/admin/settings`,
        settings,
        { headers: { atoken: aToken } }
      );
      
      if (res.data.success) {
        toast.success("Settings updated successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  const runAIHealthCheck = async () => {
    setIsAnalyzing(true);
    setAiAnalysis("");
    
    try {
      const res = await axios.get(`${backendUrl}/api/admin/system-health`, {
        headers: { atoken: aToken }
      });
      
      if (res.data.success) {
        setAiAnalysis(res.data.analysis);
      }
    } catch (err) {
      setAiAnalysis("Error fetching system analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const purgeAppointments = async () => {
    if (!window.confirm("Are you sure? This will permanently delete all cancelled appointments.")) {
      return;
    }

    try {
      const res = await axios.delete(`${backendUrl}/api/admin/purge-cancelled`, {
        headers: { atoken: aToken }
      });
      
      if (res.data.success) {
        toast.success(`${res.data.count} appointments purged`);
      }
    } catch (err) {
      toast.error("Error purging appointments");
    }
  };

  const clearCache = async () => {
    if (!window.confirm("Clear all system cache?")) {
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/admin/clear-cache`, {}, {
        headers: { atoken: aToken }
      });
      
      if (res.data.success) {
        toast.success("Cache cleared successfully");
      }
    } catch (err) {
      toast.error("Error clearing cache");
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <Loader className='w-8 h-8 animate-spin text-blue-600' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      
      {/* Header */}
      <div className='max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
            <Settings className='w-8 h-8 text-blue-600' />
            System Settings
          </h1>
          <p className='text-gray-500 mt-1'>Manage platform configuration, appointments, and system behavior.</p>
        </div>
        
        <button 
          onClick={saveSettings}
          disabled={isSaving}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all disabled:opacity-50'
        >
          {isSaving ? <Loader className='w-5 h-5 animate-spin' /> : <Save className='w-5 h-5' />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>

        {/* --- CARD 1: PLATFORM STATE --- */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-1'>
          <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
            <Activity className='w-5 h-5 text-red-500' />
            <h2 className='text-lg font-bold text-gray-800'>Platform State</h2>
          </div>

          <div className='space-y-6'>
            {/* Maintenance Mode */}
            <div className='flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100'>
              <div>
                <p className='font-semibold text-red-700'>Maintenance Mode</p>
                <p className='text-xs text-red-500'>Stops all user login & booking.</p>
              </div>
              <button onClick={() => handleToggle('maintenanceMode')} className='text-red-600 focus:outline-none'>
                {settings.maintenanceMode 
                  ? <ToggleRight className='w-10 h-10 fill-current' /> 
                  : <ToggleLeft className='w-10 h-10 text-gray-400' />}
              </button>
            </div>

            {/* Registration Toggle */}
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-700'>Allow New Registrations</p>
                <p className='text-xs text-gray-500'>Doctors and Patients can sign up.</p>
              </div>
              <button onClick={() => handleToggle('allowRegistrations')} className='text-green-600 focus:outline-none'>
                {settings.allowRegistrations
                  ? <ToggleRight className='w-10 h-10 fill-current' /> 
                  : <ToggleLeft className='w-10 h-10 text-gray-400' />}
              </button>
            </div>
          </div>
        </div>

        {/* --- CARD 2: APPOINTMENT CONFIGURATION --- */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2'>
          <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
            <Calendar className='w-5 h-5 text-blue-500' />
            <h2 className='text-lg font-bold text-gray-800'>Appointment Rules</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            
            {/* Platform Fee */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Platform Fee (%)</label>
              <div className='relative'>
                <input 
                  type="number" 
                  name="platformFee"
                  min="0"
                  max="100"
                  value={settings.platformFee}
                  onChange={handleChange}
                  className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
                />
                <span className='absolute right-4 top-2 text-gray-400 font-bold'>%</span>
              </div>
              <p className='text-xs text-gray-500 mt-2'>Commission taken from each appointment payment.</p>
            </div>

            {/* Cancellation Window */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Cancellation Window (Hours)</label>
              <input 
                type="number" 
                name="cancellationWindow"
                min="0"
                value={settings.cancellationWindow}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
              />
              <p className='text-xs text-gray-500 mt-2'>Free cancellation allowed before this time.</p>
            </div>

            {/* Max Appointments */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Global Max Daily Slots</label>
              <input 
                type="number" 
                name="maxAppointmentsPerDay"
                min="1"
                value={settings.maxAppointmentsPerDay}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
              />
              <p className='text-xs text-gray-500 mt-2'>System-wide daily appointment limit.</p>
            </div>
          </div>
        </div>

        {/* --- CARD 3: DOCTOR GOVERNANCE --- */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-1'>
          <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
            <Shield className='w-5 h-5 text-purple-500' />
            <h2 className='text-lg font-bold text-gray-800'>Doctor Verification</h2>
          </div>

          <div className='space-y-6'>
            {/* Auto Verify */}
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-700'>Auto-Verify Doctors</p>
                <p className='text-xs text-gray-500'>Skip manual document check.</p>
              </div>
              <button onClick={() => handleToggle('autoVerifyDoctors')} className='text-blue-600 focus:outline-none'>
                {settings.autoVerifyDoctors
                  ? <ToggleRight className='w-10 h-10 fill-current' /> 
                  : <ToggleLeft className='w-10 h-10 text-gray-400' />}
              </button>
            </div>

            {settings.autoVerifyDoctors && (
              <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
                <div className='flex items-center gap-2 text-yellow-800 font-bold mb-1'>
                   <AlertTriangle className='w-4 h-4' /> Warning
                </div>
                <p className='text-xs text-yellow-700'>
                  Doctors will be instantly verified. Ensure you have backend validation in place.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- CARD 4: NOTIFICATIONS --- */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2'>
          <div className='flex items-center gap-2 mb-6 border-b border-gray-100 pb-4'>
            <Bell className='w-5 h-5 text-orange-500' />
            <h2 className='text-lg font-bold text-gray-800'>Notification Settings</h2>
          </div>

          <div className='space-y-4'>
            {/* Appointment Reminders */}
            <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
              <div>
                <p className='font-medium text-gray-700'>Appointment Reminders</p>
                <p className='text-xs text-gray-500'>Send reminders before appointments.</p>
              </div>
              <button onClick={() => handleToggle('appointmentReminder')} className='text-blue-600 focus:outline-none'>
                {settings.appointmentReminder
                  ? <ToggleRight className='w-10 h-10 fill-current' /> 
                  : <ToggleLeft className='w-10 h-10 text-gray-400' />}
              </button>
            </div>

            {/* Email Notifications */}
            <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
              <div>
                <p className='font-medium text-gray-700'>Email Notifications</p>
                <p className='text-xs text-gray-500'>Send emails to users and doctors.</p>
              </div>
              <button onClick={() => handleToggle('emailNotifications')} className='text-blue-600 focus:outline-none'>
                {settings.emailNotifications
                  ? <ToggleRight className='w-10 h-10 fill-current' /> 
                  : <ToggleLeft className='w-10 h-10 text-gray-400' />}
              </button>
            </div>

            {/* SMS Notifications */}
            <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
              <div>
                <p className='font-medium text-gray-700'>SMS Notifications</p>
                <p className='text-xs text-gray-500'>Send SMS alerts (requires Twilio setup).</p>
              </div>
              <button onClick={() => handleToggle('smsNotifications')} className='text-blue-600 focus:outline-none'>
                {settings.smsNotifications
                  ? <ToggleRight className='w-10 h-10 fill-current' /> 
                  : <ToggleLeft className='w-10 h-10 text-gray-400' />}
              </button>
            </div>
          </div>
        </div>

        {/* --- CARD 5: SYSTEM HEALTH --- */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-3'>
          <div className='flex items-center justify-between border-b border-gray-100 pb-4 mb-4'>
            <div className='flex items-center gap-2'>
              <Sparkles className='w-5 h-5 text-indigo-500' />
              <h2 className='text-lg font-bold text-gray-800'>System Health Analysis</h2>
            </div>
            <button 
              onClick={runAIHealthCheck}
              disabled={isAnalyzing}
              className='text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-2 rounded-full hover:bg-indigo-100 transition disabled:opacity-50'
            >
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </button>
          </div>

          <div className='bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 min-h-[120px] overflow-y-auto'>
            {!aiAnalysis && !isAnalyzing && (
              <p className='text-gray-500 italic'>System awaiting analysis command...</p>
            )}
            {isAnalyzing && (
              <div className='flex items-center gap-2'>
                <Loader className='w-4 h-4 animate-spin' />
                <span>Checking database, analyzing logs...</span>
              </div>
            )}
            {aiAnalysis && (
              <p>{aiAnalysis}</p>
            )}
          </div>
        </div>

        {/* --- CARD 6: DANGER ZONE --- */}
        <div className='bg-white rounded-xl shadow-sm border border-red-200 p-6 lg:col-span-3'>
           <div className='flex items-center gap-2 mb-6'>
             <Database className='w-5 h-5 text-red-600' />
             <h2 className='text-lg font-bold text-red-600'>Danger Zone</h2>
           </div>
           
           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <button 
                onClick={purgeAppointments}
                className='px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-semibold transition'
              >
                <Trash2 className='w-4 h-4 inline mr-2' />
                Purge Cancelled Appointments
              </button>
              <button 
                onClick={clearCache}
                className='px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-semibold transition'
              >
                <Loader className='w-4 h-4 inline mr-2' />
                Clear System Cache
              </button>
           </div>
        </div>

      </div>
    </div>
  )
}

export default Setting