// frontend/src/components/News/NewsList.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = ({ backendUrl }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/api/articles`)
      .then(response => {
        setNewsArticles(response.data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching news articles:', error);
        setError('An error occurred while fetching news articles.'); // Set error message
      });
  }, []);

  return (
    <div>
      <h2>News Articles</h2>
      {error ? <p>{error}</p> : null}
      {newsArticles.map(article => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p>Author: {article.author}</p>
          {/* Display other fields */}
        </div>
      ))}
    </div>
  );
};

export default NewsList;
