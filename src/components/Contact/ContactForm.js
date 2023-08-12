// frontend/src/components/Contact/ContactForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_BACKEND_URL/api/messages', {
        name,
        email,
        subject,
        message,
      });
      console.log('Contact message submitted:', response.data);
      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact message:', error);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {/* Other input fields for email, subject, and message */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
