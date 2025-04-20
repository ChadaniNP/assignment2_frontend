import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBlog from './CreateBlog';  // Add this import
import Logout from './Logout';          // Add this import
import Login from './Login';            // Add this import
import Register from './Register';

function Home() {
  const [blogs, setBlogs] = useState([]); // State to store all blogs
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(false); // Toggle between register and login

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchBlogs();
    }
  }, [token]);

  // Fetch all blogs after successful login
  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://assignment2-backend-nine.vercel.app/api/blogs/');
      setBlogs(res.data); // Store fetched blogs
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsLoggedIn(true);
    fetchBlogs(); // Fetch blogs after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    setShowLogin(false); // Go back to Register page
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Blog</h1>

      {isLoggedIn ? (
        <>
          <h2>You are logged in!</h2>
          <CreateBlog />
          <Logout onLogout={handleLogout} />
          <div>
            <h3>All Blogs</h3>
            {blogs.length > 0 ? (
              <ul>
                {blogs.map((blog, index) => (
                  <li key={index}>
                    <h4>{blog.title}</h4>
                    <p>{blog.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No blogs to display yet.</p>
            )}
          </div>
        </>
      ) : (
        <>
          {showLogin ? (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <p>
                Don't have an account?{' '}
                <span onClick={() => setShowLogin(false)} style={{ color: 'blue', cursor: 'pointer' }}>
                  Register
                </span>
              </p>
            </>
          ) : (
            <>
              <Register />
              <p>
                Already have an account?{' '}
                <span onClick={() => setShowLogin(true)} style={{ color: 'blue', cursor: 'pointer' }}>
                  Login
                </span>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
