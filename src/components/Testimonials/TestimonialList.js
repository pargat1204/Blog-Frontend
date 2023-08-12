// frontend/src/components/Testimonials/TestimonialList.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialList = ({ backendUrl }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/api/testimonials`)
      .then(response => {
        setTestimonials(response.data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
        setError('An error occurred while fetching testimonials.'); // Set error message
      });
  }, []);

  return (
    <div>
      <h2>Testimonials</h2>
      {error ? <p>{error}</p> : null}
      {testimonials.map(testimonial => (
        <div key={testimonial._id}>
          <h3>{testimonial.name}</h3>
          <p>{testimonial.content}</p>
          <p>Role: {testimonial.role}</p>
          {/* Display other fields */}
        </div>
      ))}
    </div>
  );
};

export default TestimonialList;
