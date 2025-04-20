import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Like from './Like';

function CreateBlog() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchBlogs = useCallback(async () => {
    if (!token) {
      setError("You need to be logged in to view blogs.");
      return;
    }

    try {
      const res = await axios.get('https://assignment2-backend-nine.vercel.app/api/blogs/', {
        headers: { Authorization: `Token ${token}` },
      });
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Error fetching blogs');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You need to be logged in to create a blog.");
      return;
    }

    try {
      await axios.post(
        'https://assignment2-backend-nine.vercel.app/api/create/',
        form,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      alert('Blog created successfully!');
      setForm({ title: '', content: '' });
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
      setError('Error creating blog');
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      setError("You need to be logged in to delete a blog.");
      return;
    }

    try {
      await axios.delete(
        `https://assignment2-backend-nine.vercel.app/api/blogs/${id}/delete/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      alert('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Error deleting blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button type="submit">Create Blog</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>All Blogs</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px 0',
              padding: '10px',
              textAlign: 'left',
              position: 'relative',
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <Like blogId={blog.id} />

            <button
              onClick={() => navigate(`/edit/${blog.id}`)}
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '5px 10px',
                marginTop: '10px',
                marginRight: '10px',
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(blog.id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '5px 10px',
                marginTop: '10px',
              }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No blogs yet.</p>
      )}
    </div>
  );
}

export default CreateBlog;
