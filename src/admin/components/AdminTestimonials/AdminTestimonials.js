// frontend/src/admin/AdminTestimonials.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTestimonials = ({ backendUrl }) => {
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({ name: '', content: '', role: '' });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = () => {
        axios.get(`${backendUrl}/api/testimonials`)
            .then(response => {
                setTestimonials(response.data);
            })
            .catch(error => {
                console.error('Error fetching testimonials:', error);
            });
    };

    const handleCreateTestimonial = () => {
        axios.post(`${backendUrl}/api/testimonials`, newTestimonial)
            .then(response => {
                setTestimonials([...testimonials, response.data]);
                setNewTestimonial({ name: '', content: '', role: '' });
            })
            .catch(error => {
                console.error('Error creating testimonial:', error);
            });
    };

    const handleDeleteTestimonial = (testimonialId) => {
        axios.delete(`${backendUrl}/api/testimonials/${testimonialId}`)
            .then(() => {
                setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialId));
            })
            .catch(error => {
                console.error('Error deleting testimonial:', error);
            });
    };

    return (
        <div>
            <h2>Manage Testimonials</h2>
            <div>
                <h3>Create New Testimonial</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newTestimonial.name}
                    onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={newTestimonial.content}
                    onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={newTestimonial.role}
                    onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                />
                <button onClick={handleCreateTestimonial}>Create Testimonial</button>
            </div>
            <div>
                <h3>Existing Testimonials</h3>
                {testimonials.map(testimonial => (
                    <div key={testimonial._id}>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.content}</p>
                        <p>Role: {testimonial.role}</p>
                        <button onClick={() => handleDeleteTestimonial(testimonial._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTestimonials;
