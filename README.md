# Medical Hub - Doctor Appointment Booking System

A modern, full-stack healthcare application that connects patients with qualified doctors for seamless appointment booking, prescription management, and health record tracking.

## 📋 Project Overview

Medical Hub is a comprehensive healthcare platform consisting of three main components:
- **Frontend**: Patient-facing React application
- **Admin Panel**: Administrative dashboard for managing doctors and system settings
- **Backend**: Node.js/Express server with MongoDB

## 🏗️ Architecture

```
Medical Hub/
├── Frontend/          # Patient application (Vite + React)
├── admin/            # Admin/Doctor dashboard (Vite + React)
└── Backend/          # Express.js server with MongoDB
```

## ✨ Key Features

### Patient Features (Frontend)
- 🔐 User authentication and registration
- 👨‍⚕️ Browse and search doctors by speciality
- 📅 Book appointments with available time slots
- 💊 View and manage prescriptions
- 👤 Complete patient profile management
- 📋 Track upcoming and past appointments
- ⚙️ Account settings and preferences

### Admin Features (Admin Panel)
- 🏥 Dashboard with system analytics
- 👨‍⚕️ Add and manage doctor profiles
- 📊 Monitor all appointments
- ⚙️ System settings and configuration
- 👨‍⚕️ Doctor availability management
- 📈 View platform statistics

### Doctor Features (Admin Panel)
- 📋 View assigned appointments
- 👤 Manage professional profile
- 💊 Add and manage prescriptions
- ✅ Update appointment status
- 📊 Track patient interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Medical-Hub
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET_KEY=<your-cloudinary-secret-key>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
JWT_SECRET=<your-jwt-secret>
```

3. **Frontend Setup**
```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```
VITE_BACKEND_URL=http://localhost:5000
```

4. **Admin Panel Setup**
```bash
cd admin
npm install
```

Create a `.env` file in the admin directory:
```
VITE_BACKEND_URL=http://localhost:5000
```

## 🔧 Development

### Run Backend Server
```bash
cd Backend
npm start
# Server runs on http://localhost:5000
```

### Run Frontend Application
```bash
cd Frontend
npm run dev
# Application runs on http://localhost:5173
```

### Run Admin Panel
```bash
cd admin
npm run dev
# Admin panel runs on http://localhost:5174
```

## 📁 Project Structure

### Frontend (`Frontend/src/`)
```
src/
├── Pages/               # Page components
│   ├── Home.jsx
│   ├── SearchDoctors.jsx
│   ├── DoctorDetails.jsx
│   ├── BookAppointment.jsx
│   ├── PatientDashboard.jsx
│   ├── Profile.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Setting.jsx
│   └── Login.jsx
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Banner.jsx
│   ├── PrescriptionViewer.jsx
│   ├── Calendar.jsx
│   └── Sidebar.jsx
├── context/             # State management
│   └── AppContext.jsx
├── assets/              # Images and icons
└── App.jsx
```

### Admin Panel (`admin/src/`)
```
src/
├── pages/
│   ├── Login.jsx
│   ├── Layout.jsx
│   ├── AdminDashboard/
│   │   ├── Dashboard.jsx
│   │   ├── AddDoctors.jsx
│   │   ├── DoctorList.jsx
│   │   ├── Appointment.jsx
│   │   └── Setting.jsx
│   └── DoctorDashBoard/
│       ├── DoctorDashboard.jsx
│       ├── Appointments.jsx
│       └── Profile.jsx
├── components/
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── context/
│   ├── AdminContext.jsx
│   ├── DoctorContext.jsx
│   └── AppContext.jsx
└── App.jsx
```

### Backend (`Backend/`)
```
Backend/
├── config/
│   ├── mongodb.js       # MongoDB connection
│   └── cloudinary.js    # Cloudinary setup
├── models/
│   ├── userModel.js
│   ├── doctorModel.js
│   └── appointmentModel.js
├── controllers/
│   ├── authController.js
│   ├── adminController.js
│   ├── doctorController.js
│   └── appointmentController.js
├── middlewares/
│   ├── authAdmin.js
│   ├── authDoctor.js
│   ├── authmiddleware.js
│   └── multer.js
├── routes/
│   ├── auth.js
│   ├── adminRoutes.js
│   ├── doctorRoutes.js
│   └── appointmentRoutes.js
├── server.js
└── .env
```

## 🔌 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/all-doctors` - Get all doctors
- `POST /api/admin/add-doctor` - Add new doctor
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update settings

### Doctor
- `POST /api/doctors/login` - Doctor login
- `GET /api/doctors/<id>` - Get doctor details
- `PUT /api/doctors/<id>` - Update doctor profile

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get appointments
- `PUT /api/appointments/<id>` - Update appointment
- `GET /api/appointments/<id>` - Get appointment details

## 🛠️ Technologies Used

### Frontend & Admin
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **Bcrypt** - Password hashing

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication:

- **Patient Token**: `token` stored in localStorage
- **Admin Token**: `aToken` stored in localStorage
- **Doctor Token**: `dToken` stored in localStorage

Protected routes check for valid tokens before granting access.

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  image: String (Cloudinary URL),
  phone: String,
  address: Object,
  gender: String,
  dob: Date
}
```

### Doctor Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  image: String (Cloudinary URL),
  speciality: String,
  degree: String,
  experience: Number,
  about: String,
  fees: Number,
  address: Object,
  available: Boolean,
  slots_booked: Array
}
```

### Appointment Model
```javascript
{
  userId: ObjectId (ref: User),
  doctorId: ObjectId (ref: Doctor),
  slotDate: Date,
  slotTime: String,
  userData: Object,
  doctorData: Object,
  amount: Number,
  date: Date,
  cancelled: Boolean,
  status: String (booked/Completed/Cancelled)
}
```

## 🎨 UI Components

### Key Components
- **Navbar** - Navigation with user dropdown
- **Sidebar** - Navigation menu for authenticated users
- **DoctorCard** - Display doctor information
- **Calendar** - Appointment booking calendar
- **PrescriptionViewer** - View and manage prescriptions
- **Banner** - Hero section with CTA

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl)
- Touch-friendly interfaces
- Adaptive layouts

## 🚀 Build & Deployment

### Build Frontend
```bash
cd Frontend
npm run build
# Creates dist/ folder
```

### Build Admin Panel
```bash
cd admin
npm run build
# Creates dist/ folder
```

### Production Checklist
- [ ] Set environment variables
- [ ] Configure MongoDB connection
- [ ] Setup Cloudinary account
- [ ] Test all API endpoints
- [ ] Configure CORS origins
- [ ] Setup SSL certificates
- [ ] Configure domain/DNS

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Issues
- Check MongoDB service is running
- Verify connection string in `.env`
- Check firewall settings

### Cloudinary Upload Issues
- Verify API credentials
- Check file size limits
- Ensure image format is supported

## 📝 Environment Variables Reference

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
JWT_SECRET=your_jwt_secret_key
```

### Frontend `.env`
```
VITE_BACKEND_URL=http://localhost:5000
```

### Admin `.env`
```
VITE_BACKEND_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For support, email support@medicalhub.com or open an issue in the repository.

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Video consultation feature
- [ ] SMS/Email notifications
- [ ] Telemedicine capabilities
- [ ] Health records management
- [ ] Doctor ratings and reviews
- [ ] Insurance integration
- [ ] Multi-language support
- [ ] Dark mode theme

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated**: 2024
**Version**: 1.0.0
