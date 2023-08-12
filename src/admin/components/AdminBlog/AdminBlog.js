// frontend/src/admin/AdminBlog.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBlog = ({ backendUrl }) => {
    // State for managing blog posts
    const [blogPosts, setBlogPosts] = useState([]);
    // State for form data
    const [formData, setFormData] = useState({ title: '', content: '', author: '' });

    // Fetch blog posts on component mount
    useEffect(() => {
        fetchBlogPosts();
    }, []);

    // Fetch blog posts
    const fetchBlogPosts = () => {
        axios.get(`${backendUrl}/api/posts`)
            .then(response => {
                setBlogPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    };

    // Handle form input change
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission for adding a new blog post
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${backendUrl}/api/posts`, formData)
            .then(response => {
                // Refresh the blog posts list
                fetchBlogPosts();
                // Clear form data
                setFormData({ title: '', content: '', author: '' });
            })
            .catch(error => {
                console.error('Error adding blog post:', error);
            });
    };

    // Handle delete button click
    const handleDelete = postId => {
        axios.delete(`${backendUrl}/api/posts/${postId}`)
            .then(response => {
                // Refresh the blog posts list
                fetchBlogPosts();
            })
            .catch(error => {
                console.error('Error deleting blog post:', error);
            });
    };

    return (
        <div>
            <h2>Admin Panel - Blog</h2>
            {/* Form for adding new blog posts */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                <input type="text" name="content" value={formData.content} onChange={handleInputChange} />
                <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
                <button type="submit">Add Post</button>
            </form>
            {/* List of existing blog posts */}
            <div>
                {blogPosts.map(post => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Author: {post.author}</p>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBlog;
