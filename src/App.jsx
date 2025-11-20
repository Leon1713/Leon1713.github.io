import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CarDetail from './pages/CarDetail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Rental from './pages/Rental.jsx';

const App = () => (
  <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/rental" element={<Rental />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
