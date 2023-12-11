import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, e.g., redirect to login page
        console.log('Account created successfully!');
      } else {
        // Handle error, e.g., display an error message
        console.error('Failed to create account');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <div className='create-account-flex-container'>
      <div className='form-create-account'>
        <h4>Don't have an account yet ?</h4>
        <hr className='hr-create-account' />
        <p className='text-create-account'>Please enter complete information below.</p>
        <form onSubmit={handleSubmit}>
          <input
            className='input-create-account'
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='input-create-account'
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
      </div>

      <div className='forms-create-account'>
        <p className='login-create-account'>
          Do you have an account ?
          <span>
            <Link className='forgot-password' to='/login'>
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
