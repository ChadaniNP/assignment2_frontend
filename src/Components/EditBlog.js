import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You need to be logged in.');
      return;
    }

    const fetchBlog = async () => {
      try {
        // ✅ fetch the blog with the correct ID
        const res = await axios.get('https://assignment2-backend-nine.vercel.app/api/blogs/${id}/edit/`, {
          headers: { Authorization: `Token ${token}` }
        });
        setForm({ title: res.data.title, content: res.data.content }); // prefill form
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog');
      }
    };

    fetchBlog();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/blogs/${id}/edit/`,
        form,
        {
          headers: { Authorization: `Token ${token}` }
        }
      );
      alert('Blog updated successfully!');
      navigate('/'); // go back to blog list
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to update blog');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button type="submit">Update Blog</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default EditBlog;
