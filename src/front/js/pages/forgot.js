import React, { useState } from 'react';
import "../../styles/forgot.css";
import { useNavigate } from 'react-router-dom';

export function Forgot() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();  

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement the logic to handle the password reset request here
        // This usually involves calling an API that handles the password reset process
        console.log('Password reset request for:', email);
        // Show a message to the user or handle the next steps in the process
    };
    
    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Request Password Reset</button>
            </form>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}
