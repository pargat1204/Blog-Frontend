// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes';
import Home from './components/Home';
import BlogList from './components/Blog/BlogList';
import NewsList from './components/News/NewsList';
import TestimonialList from './components/Testimonials/TestimonialList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// require('dotenv').config();

const App = () => {
    const backendUrl = "http://localhost:5000";
    const isAdmin = true; // Implement user authentication/authorization logic
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home backendUrl={backendUrl} />} />
                <Route path="/blog/:id" element={<BlogList backendUrl={backendUrl} />} />
                <Route path="/news/:id" element={<NewsList backendUrl={backendUrl} />} />
                <Route path="/testimonial/:id" element={<TestimonialList backendUrl={backendUrl} />} />
                {/* Admin Panel Routes */}
                {isAdmin && <Route path="/admin/*" element={<AdminRoutes backendUrl={backendUrl} />} />}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
