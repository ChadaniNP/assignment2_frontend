import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Like({ blogId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blogs/${blogId}/`, {
          headers: { Authorization: `Token ${token}` },
        });

        setLikes(res.data.likes || 0);
        setLiked(res.data.liked_by_user || false);
      } catch (error) {
        console.error('Failed to fetch blog details:', error);
      }
    };

    if (token) {
      fetchBlogDetails();
    }
  }, [blogId, token]);

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/blogs/${blogId}/like/`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      // Toggle UI immediately
      setLiked((prevLiked) => !prevLiked);
      setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      style={{
        backgroundColor: liked ? '#e63946' : '#adb5bd', // red if liked, grey otherwise
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
      }}
    >
      {liked ? '🤍 Liked' : '❤️ Like'} ({likes})
    </button>
  );
}

export default Like;
