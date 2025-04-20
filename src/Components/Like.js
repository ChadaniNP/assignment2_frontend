import React, { useState } from 'react';
import axios from 'axios';

function LikeBlog({ id, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const res = await axios.post(
        `https://assignment2-backend-nine.vercel.app/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      setLikes(res.data.likes); // if backend returns updated likes count
      // or: setLikes(prev => prev + 1);
    } catch (error) {
      console.error(error);
      alert('Failed to like the blog.');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={isLiking}>
        👍 Like ({likes})
      </button>
    </div>
  );
}

export default LikeBlog;
