import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

import { useAuth } from '../Components/AuthContext';
import { useUser } from '../Components/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserData } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const success = await login(email, password);
  
      if (success) {
        // Replace {email} with the actual email value
        const userResponse = await fetch(`http://localhost:5001/api/auth/users/user/${email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserData(userData);
          navigate('/homepage', { replace: true });
        } else {
          console.error('Failed to fetch user data.');
        }
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <div className="login-flex-container">
      <div className='welcome-hutech-forum'>
        <h1 className='HUTECH'>HUTECH</h1>
        <h2 className='welcome'>Greetings and welcome to HUTECH Forum, a place where you can debate and exchange information with others users while also getting the most recent information about HUTECH</h2>
      </div>

      <div className='form-login'>
        <form onSubmit={handleLogin}>
          <div>
            <input
              className='input-login'
              type="text"
              placeholder="Enter username ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              className='input-login'
              type="password"
              placeholder="Enter password ..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className="bt-login" type="submit">
              Login
            </button>
          </div>

          <div>
            <Link className='forgot-password' to='/forgotpassword'> Forgot Password ? </Link>
          </div>

          <div>
            <hr className='hr-login'/>
          </div>

          <div>
            <button onClick={() => { navigate('/createaccount', { replace: true }) }} className="bt-logins" type="button">
              Don't have an account yet?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
