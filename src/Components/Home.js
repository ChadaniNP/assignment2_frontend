// Home.js
import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import CreateBlog from './CreateBlog';
import Logout from './Logout'; // Import Logout component

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token from localStorage

  // Set isLoggedIn to true if token exists
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // Handle logout by removing the token and updating state
  const handleLogout = () => {
    setToken(null); // Clear the token in state
    setIsLoggedIn(false); // Update the login status
  };

  return (
    <div>
      <h1>Welcome to the Blog</h1>

      {isLoggedIn ? (
        <>
          <h2>You are logged in!</h2>
          <CreateBlog /> {/* Show CreateBlog only if logged in */}
          <Logout onLogout={handleLogout} /> {/* Show Logout button if logged in */}
        </>
      ) : (
        <>
          <Login /> {/* Show Login form if not logged in */}
          <Register /> {/* Show Register form if not logged in */}
        </>
      )}
    </div>
  );
}

export default Home;
