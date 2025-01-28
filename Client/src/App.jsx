import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

