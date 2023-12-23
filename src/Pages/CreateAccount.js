import React, { useState } from 'react';
import './CreateAccount.css';
import { Link, useHistory, NavLink } from 'react-router-dom';
import { MdDoorBack } from 'react-icons/md';

function CreateAccount() {
  const formData = new FormData();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [department, setDepartment] = useState('');
  const [studentID, setStudentID] = useState('')
  const [status, setStatus] = useState(null); // null: not submitted, true: success, false: error
  const [avatar, setAvatar] = useState(null); // New state for avatar file

  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('DOB', dob);
    formData.append('department', department);
    formData.append('studentID', studentID);
    formData.append('avatar', avatar);

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus(true); // Success
      } else {
        setStatus(false); // Error
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setStatus(false); // Error
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
          <input
            className='input-create-account'
            type="text"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
          />
          <input
            className='input-create-account'
            type="text"
            placeholder="Enter Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            className='input-create-account'
            type="number"
            placeholder="Enter StudentID"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
           <input
            className='input-create-account'
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <button type="submit" className='bt-submit-create-account'>
            Submit
          </button>
        </form>
        {status !== null && (
          <div className={status ? 'success-message' : 'error-message'}>
            {status ? 'Please active account in your email  '  : 'Failed to create account. Email is already bound to another account  '}
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

export default CreateAccount;