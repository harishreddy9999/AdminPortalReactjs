import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home';
import About from '../components/About';
import Services from '../components/Services';
import Products from '../components/Products';
import Contact from '../components/Contact';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default AppRoutes;
