import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    onLogout(); // Call the parent onLogout function to update the state
    alert('Logged out successfully!');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
