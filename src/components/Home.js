// frontend/src/components/Home.js

import React from 'react';
import BlogList from './Blog/BlogList';
import NewsList from './News/NewsList';
import TestimonialList from './Testimonials/TestimonialList';

const Home = ({ backendUrl }) => {
  return (
    <div className="home">
      <h1>Welcome to Our Blog!</h1>
      <BlogList backendUrl={ backendUrl } />
      <NewsList backendUrl={ backendUrl } />
      <TestimonialList backendUrl={ backendUrl } />
    </div>
  );
};

export default Home;


