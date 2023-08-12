// frontend/src/admin/AdminRoutes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminBlog from './components/AdminBlog/AdminBlog';
import AdminNews from './components/AdminNews/AdminNews';
import AdminTestimonials from './components/AdminTestimonials/AdminTestimonials';

const AdminRoutes = ({ backendUrl }) => {
    return (
        <Routes>
            <Route path="/blog" element={<AdminBlog backendUrl={backendUrl} />} />
            <Route path="/news" element={<AdminNews backendUrl={backendUrl} />} />
            <Route path="/testimonials" element={<AdminTestimonials backendUrl={backendUrl} />} />
            {/* Add more admin routes here */}
        </Routes>
    );
};

export default AdminRoutes;
