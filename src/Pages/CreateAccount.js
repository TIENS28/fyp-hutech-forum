import React from 'react';
import { Link } from 'react-router-dom'
import './CreateAccount.css';

function CreateAccount() {
  return (
    <div className='create-account-flex-container'>
        <div className='form-create-account'>
            <h4>Don't have an account yet ?</h4>
            <hr className='hr-create-account'/>
            <p className='text-create-account'>Please enter complete information below.</p>
            <form>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter full name"/>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter email"/>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter day of birth"/>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter Student_ID"/>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter phone numbers"/>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter class"/>
                <input className='input-create-account'
                       type="text"
                       placeholder="Enter Faculty/Institute"/>
            </form>
            <p className='texts-create-account'>Once you've provided all the necessary information, kindly proceed by clicking the Submit 
            button below.</p>
            <button className='bt-submit-create-account'>Submit</button>
        </div>

        <div className='forms-create-account'>
            <p className='login-create-account'>Do you have an account ? 
            <span><Link className='forgot-password' to='/login'> Login </Link></span></p>
        </div>
    </div>
  );
}

export default CreateAccount;