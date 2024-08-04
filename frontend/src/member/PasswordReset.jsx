import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PasswordReset.css'; // Make sure to create this CSS file for styling

function PasswordReset() {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Request password reset for:', userInput);
        // Here you would typically call an API to handle the password reset
        alert('If an account exists for the provided details, a reset link will be sent.');
    };

    return (
        <div className="passwordReset">
            <div className="passwordResetBox">
                <h2>Password Reset</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your email or username"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                    />
                    <button type="submit" className="resetButton">Send Reset Link</button>
                </form>
                <Link to="/login">Go back to Login</Link>
            </div>
        </div>
    );
}

export default PasswordReset;
