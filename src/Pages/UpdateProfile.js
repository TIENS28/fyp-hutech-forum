import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Components/UserContext';
import './UpdateProfile.css';

import { MdEdit } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";

function UpdateProfile() {
    const { user } = useUser();
    const navigate = useNavigate();
  return (
    <>
    <div><h2>UpdateProfile</h2></div>
    <div className='setting-flex-container'>
    <div>
          <h2 className='setting-h2'>Profile</h2>
          <div className='form-setting'>
            <p className='setting-text'>Full Name</p>
            <div className='setting-information'>
                <p className='setting-texts'>{user.fullName}</p>
                <span className='setting-edit'><MdEdit /></span>
            </div>
            <hr className='setting-hr'/>
          </div>
          <div className='form-setting'>
            <p className='setting-text'>Email</p>
            <div className='setting-information'>
                <p className='setting-texts'>{user.email}</p>
                <span className='setting-edit'><MdEdit /></span>
            </div>
            <hr className='setting-hr'/>
          </div>
          <div className='form-setting'>
            <p className='setting-text'>DOB</p>
            <div className='setting-information'>
                <p className='setting-texts'>{user.dob}</p>
                <span className='setting-edit'><MdEdit /></span>
            </div>
            <hr className='setting-hr'/>
          </div>
          <div className='form-setting'>
            <p className='setting-text'>Department</p>
            <div className='setting-information'>
                <p className='setting-texts'>{user.department}</p>
                <span className='setting-edit'><MdEdit /></span>
            </div>
            <hr className='setting-hr'/>
          </div>
          <div className='form-setting'>
            <p className='setting-text'>Student ID</p>
            <div className='setting-information'>
                <p className='setting-texts'>{user.studentID}</p>
                <span className='setting-edit'><MdEdit /></span>
            </div>
            <hr className='setting-hr'/>
          </div>
      </div>

      <div className='bt-settings'>
        <button onClick={()=>{navigate('/setting', {replace:true})}}
                className='bt-update-setting'><IoMdArrowRoundBack style={{ marginRight: '5px' }}/>Back</button>
        <button 
                className='bt-update-profile'><RxUpdate style={{ marginRight: '5px' }}/>Update Profile</button>
      </div>
    </div>
    </>
  )
}

export default UpdateProfile