import React, { useState } from 'react';
import axios from 'axios';

// ...rest of your Login component

function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('https://assignment2-backend-nine.vercel.app/api/login/', form);
            const token = res.data.token;
            localStorage.setItem('token', token);
            alert('Login successful!');
            if (onLoginSuccess) {
                onLoginSuccess(token);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Login</h1>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} style={inputStyle} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={e => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

// Reuse style constants to avoid ESLint errors
const containerStyle = { maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' };
const headingStyle = { textAlign: 'center', color: '#333' };
const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' };
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' };
const buttonHoverStyle = { backgroundColor: '#45a049' };

export default Login;