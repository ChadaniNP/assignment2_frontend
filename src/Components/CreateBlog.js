import React, { useState } from 'react';
import axios from 'axios';

function CreateBlog() {
    const [form, setForm] = useState({ title: '', content: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');  // Get token from localStorage

        // Check if token exists before making the request
        if (!token) {
            setError("You need to be logged in to create a blog.");
            return;
        }

        try {
            const res = await axios.post(
                'https://assignment2-backend-nine.vercel.app/api/create/',
                form,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Add token to Authorization header
                    }
                }
            );
            alert('Blog created successfully!');
        } catch (error) {
            console.error('Error creating blog:', error);
            setError('Error creating blog');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
            <h2>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Create Blog
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}
        </div>
    );
}

export default CreateBlog;
