import React, { useState } from 'react';
import './ForgotPassword.css';
import { NavLink } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("email", email)
    formData.append('newPassword', password);
  
    try {
      const response = await fetch('http://localhost:5001/api/auth/resetPassword', {
        method: 'POST',
        body: formData,
       
      });
  
      if (response.ok) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setStatus(false); // Error
    }
  };

  return (
    <div className='create-account-flex-container'>
      <div className='form-create-account'>
        <form onSubmit={handleSubmit}>
          <input
            className='input-create-account'
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className='input-create-account'
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='bt-submit-create-account'>
            Submit
          </button>
        </form>
        {status !== null && (
          <div className={status ? 'success-message' : 'error-message'}>
            {status ? 'Reset password successfully!  '  : 'Failed to reset password'}
            <NavLink className='forgot-password' to='/login'>
                 Login
            </NavLink>
          </div>
        )}
      </div>

      <div className='forms-create-account'>
        <p className='login-create-account'>
          Do you have an account?
          <span>
            <NavLink className='forgot-password' to='/login'>
              Login
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;