import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Components/TrangChu';
import Diemden from './Components/DiemDen';
import Login from './Components/Login';
import Register from './Components/Register';
import Tour from './Components/Tour';
import Detail from './Components/Detail';
import Cart from './Components/Cart';
import Info from './Components/Info';


import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

import './App.css';
import PaymentSuccess from './Components/PaymentSuccess';
import Faq from './Components/Faq';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MainContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function MainContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diemden" element={<Diemden />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Tour" element={<Tour />} />
        <Route path="/tours/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Faq" element={<Faq />} />

        <Route path="/Payment-success" element={<PaymentSuccess />} />
        {/* Add more routes as needed */}
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
