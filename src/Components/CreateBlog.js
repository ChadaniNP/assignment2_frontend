import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateBlog() {
    const [form, setForm] = useState({ title: '', content: '' });
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('https://assignment2-backend-nine.vercel.app/api/blogs/');
            setBlogs(res.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

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
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            alert('Blog created successfully!');
            setForm({ title: '', content: '' });
            fetchBlogs(); // refresh the blog list
        } catch (error) {
            console.error('Error creating blog:', error);
            setError('Error creating blog');
        }
    };

    useEffect(() => {
        fetchBlogs(); // load blogs on page load
    }, []);

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
                    <div key={blog.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                    </div>
                ))
            ) : (
                <p>No blogs yet.</p>
            )}
        </div>
    );
}

export default CreateBlog;
