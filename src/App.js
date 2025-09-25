import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import MedicalRecords from './pages/patient/MedicalRecords';
import BookAppointment from './pages/patient/BookAppointment';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientProfile from './pages/doctor/PatientProfile';
import TeleconsultationRoom from './pages/doctor/TeleconsultationRoom';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';

// Nurse Pages
import NurseDashboard from './pages/nurse/NurseDashboard';
import VitalsEntry from './pages/nurse/VitalsEntry';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for a user on app load
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <main className="py-3">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          
          {/* Private Routes */}
          <Route
            path="/patient-dashboard"
            element={<PrivateRoute allowedRoles={['patient']}><PatientDashboard /></PrivateRoute>}
          />
          <Route
            path="/medical-records"
            element={<PrivateRoute allowedRoles={['patient']}><MedicalRecords /></PrivateRoute>}
          />
          <Route
            path="/book-appointment"
            element={<PrivateRoute allowedRoles={['patient']}><BookAppointment /></PrivateRoute>}
          />
          <Route
            path="/doctor-dashboard"
            element={<PrivateRoute allowedRoles={['doctor']}><DoctorDashboard /></PrivateRoute>}
          />
          <Route
            path="/patient-profile/:id"
            element={<PrivateRoute allowedRoles={['doctor']}><PatientProfile /></PrivateRoute>}
          />
          <Route
            path="/teleconsultation/:id"
            element={<PrivateRoute allowedRoles={['doctor']}><TeleconsultationRoom /></PrivateRoute>}
          />
          <Route
            path="/admin-dashboard"
            element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>}
          />
          <Route
            path="/user-management"
            element={<PrivateRoute allowedRoles={['admin']}><UserManagement /></PrivateRoute>}
          />
          <Route
            path="/nurse-dashboard"
            element={<PrivateRoute allowedRoles={['nurse']}><NurseDashboard /></PrivateRoute>}
          />
          <Route
            path="/vitals-entry"
            element={<PrivateRoute allowedRoles={['nurse']}><VitalsEntry /></PrivateRoute>}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;