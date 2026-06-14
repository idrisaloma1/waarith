import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { schoolApi } from './api';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function AppLayout({ school }) {
  const location = window.location.pathname;
  const isAdmin = location.startsWith('/admin') || location === '/login';

  if (isAdmin) return null;

  return (
    <>
      <Navbar school={school} />
    </>
  );
}

function App() {
  const [school, setSchool] = useState(null);

  useEffect(() => {
    schoolApi.get().then(setSchool).catch(() => {});
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent school={school} setSchool={setSchool} />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent({ school, setSchool }) {
  const isAdmin = window.location.pathname.startsWith('/admin') || window.location.pathname === '/login';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdmin && <Navbar school={school} />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home school={school} />} />
          <Route path="/about" element={<About school={school} />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact school={school} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </div>
      {!isAdmin && <Footer school={school} />}
    </div>
  );
}

export default App;
