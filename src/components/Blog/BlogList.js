// frontend/src/components/Blog/BlogList.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = ({ backendUrl }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/api/posts`)
      .then(response => {
        setBlogPosts(response.data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setError('An error occurred while fetching blog posts.'); // Set error message
      });
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {error ? <p>{error}</p> : null}
      {blogPosts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          {/* Display other fields */}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
