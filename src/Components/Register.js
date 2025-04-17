import React, {useState} from 'react';
import axios from 'axios';

function Register() {
    const [form, setForm] = useState({username: '', password: '', email: ''});

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("https://assignment2-backend-nine.vercel.app/api/register/", form);
            alert('Registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    style={inputStyle}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={e => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
