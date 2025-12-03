
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FaUser, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { userData, UsersDataProfile, updatedUserProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  // const [image,setImage]=useState(null)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    image: null
  });

  useEffect(() => {
    UsersDataProfile();
  }, [])
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        age: userData.age || '',
        gender: userData.gender || '',
        city: userData.city || '',
        state: userData.state || '',
        country: userData.country || '',
        image: userData.image || null
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        form.append(key, formData[key]);
      });
    
      const response = await updatedUserProfile(form);
      if (response.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        await UsersDataProfile(); // Refresh profile data
      } else {
        toast.error(response.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-15">
      <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <div className=' bg-gradient-to-r from-indigo-500 to-indigo-400 p-8'>
          <div className="flex flex-col items-center ">
            <div className='relative'>
              {formData?.image ? (
                <img
                  src={
                    typeof formData.image ==='string'?
                    formData.image : URL.createObjectURL(formData.image)
                  }
                  alt='Profile'
                  className='w-32 h-32 rounded-full border-4 border-gray-200 object-cover'/>
              ) : (
                <FaUser className='w-32 h-32 text-gray-600'/>
              )}
              {isEditing && (
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='absolute bottom-0 right-0  opacity-0 cursor-pointer' />
              )}
            </div>
            <h2 className=' text-xl font-bold text-gray-800 mt-4'>{userData?.name}</h2>
            <p className='text-gray-700 font-semibold'>{userData?.email}</p>
          </div>
        </div>
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Personal Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium w-24">Phone:</span>
                      <span className="text-gray-600">{userData?.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium w-24">Age:</span>
                      <span className="text-gray-600">{userData?.age || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium w-24">Gender:</span>
                      <span className="text-gray-600">{userData?.gender || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                        Location Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-gray-700 font-medium w-24">City:</span>
                          <span className="text-gray-600">{userData?.city || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-700 font-medium w-24">State:</span>
                          <span className="text-gray-600">{userData?.state || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-700 font-medium w-24">Country:</span>
                          <span className="text-gray-600">{userData?.country || 'Not provided'}</span>
                        </div>
                      </div>
                  <div className='mt-2 flex justify-end p-4'>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                      <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Profile;