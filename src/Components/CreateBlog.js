import React, { useState } from 'react';
import axios from 'axios';

function CreateBlog() {
  const [blog, setBlog] = useState({ title: '', content: '' });

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://assignment2-backend-nine.vercel.app/',
        blog,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          }
        }
      );
      alert('Blog created!');
    } catch (error) {
      console.error(error);
      alert('Failed to create blog');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="content" placeholder="Content" onChange={handleChange}></textarea>
      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;
