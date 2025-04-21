import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirm = window.confirm('Are you sure you want to delete this blog?');
      if (!confirm) {
        navigate('/'); // Redirect to home or blog list
        return;
      }

      try {
        await axios.delete(`https://assignment2-backend-nine.vercel.app/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        alert('Blog deleted successfully.');
        navigate('/'); // Redirect after deletion
      } catch (error) {
        console.error(error);
        alert('Failed to delete the blog.');
        navigate('/');
      }
    };

    confirmAndDelete();
  }, [id, navigate]);

  return <p>Deleting blog...</p>;
}

export default DeleteBlog;
