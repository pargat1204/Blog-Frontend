// frontend/src/admin/AdminNews.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminNews = ({ backendUrl }) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: '', content: '', author: '' });

    useEffect(() => {
        fetchNewsArticles();
    }, []);

    const fetchNewsArticles = () => {
        axios.get(`${backendUrl}/api/articles`)
            .then(response => {
                setNewsArticles(response.data);
            })
            .catch(error => {
                console.error('Error fetching news articles:', error);
            });
    };

    const handleCreateArticle = () => {
        axios.post(`${backendUrl}/api/articles`, newArticle)
            .then(response => {
                setNewsArticles([...newsArticles, response.data]);
                setNewArticle({ title: '', content: '', author: '' });
            })
            .catch(error => {
                console.error('Error creating news article:', error);
            });
    };

    const handleDeleteArticle = (articleId) => {
        axios.delete(`${backendUrl}/api/articles/${articleId}`)
            .then(() => {
                setNewsArticles(newsArticles.filter(article => article._id !== articleId));
            })
            .catch(error => {
                console.error('Error deleting news article:', error);
            });
    };

    return (
        <div>
            <h2>Manage News Articles</h2>
            <div>
                <h3>Create New Article</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newArticle.title}
                    onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={newArticle.content}
                    onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newArticle.author}
                    onChange={e => setNewArticle({ ...newArticle, author: e.target.value })}
                />
                <button onClick={handleCreateArticle}>Create Article</button>
            </div>
            <div>
                <h3>Existing Articles</h3>
                {newsArticles.map(article => (
                    <div key={article._id}>
                        <h4>{article.title}</h4>
                        <p>{article.content}</p>
                        <p>Author: {article.author}</p>
                        <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNews;
