import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Setting.css';
import { useUser } from '../Components/UserContext';
import { MdEdit } from "react-icons/md";
import { FaSignOutAlt }    from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import Header from '../Components/header'; 

function Setting() {
    const { user } = useUser();
    const [toggle, setToggle] = useState(1);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function updateToggle(id) {
      setToggle(id)
    }

    const handleDeleteAccount = async () => {
      try {
        await axios.delete(`http://localhost:5001/api/auth/users/deleteUser/${user.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          
        }  
      );
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    };

  return (
    <>
    <Header />
    <div className='setting-flex-container'>

      <div className={toggle === 1 ? "show-settingss" : "settingss"}>
          <h2 className='setting-h2'>Account</h2>
          <div className='form-setting'>
            <p className='setting-text'>Email</p>
            <div className='setting-information'>
            <p className='setting-texts'>{user.email}</p>
            {/* <span className='setting-edit'><MdEdit /></span> */}
          </div>
            <hr className='setting-hr'/>
            <div>
              <h2 className='setting-h2'>Profile <MdEdit className='icon-edit-profile' onClick={()=>{navigate('/update', {replace:true})}}/></h2>
              <div className='form-setting'>
                <p className='setting-text'>Full Name</p>
                <div className='setting-information'>
                    <p className='setting-texts'>{user.fullName}</p>
                    {/* <span className='setting-edit'><MdEdit /></span> */}
                </div>
                <hr className='setting-hr'/>
              </div>
              <div className='form-setting'>
                <p className='setting-text'>Email</p>
                <div className='setting-information'>
                    <p className='setting-texts'>{user.email}</p>
                    {/* <span className='setting-edit'><MdEdit /></span> */}
                </div>
                <hr className='setting-hr'/>
              </div>
              <div className='form-setting'>
                <p className='setting-text'>DOB</p>
                <div className='setting-information'>
                    <p className='setting-texts'>{user.dob}</p>
                    {/* <span className='setting-edit'><MdEdit /></span> */}
                </div>
                <hr className='setting-hr'/>
              </div>
              <div className='form-setting'>
                <p className='setting-text'>Department</p>
                <div className='setting-information'>
                    <p className='setting-texts'>{user.department}</p>
                    {/* <span className='setting-edit'><MdEdit /></span> */}
                </div>
                <hr className='setting-hr'/>
              </div>
              <div className='form-setting'>
                <p className='setting-text'>Student ID</p>
                <div className='setting-information'>
                    <p className='setting-texts'>{user.studentID}</p>
                    {/* <span className='setting-edit'><MdEdit /></span> */}
                </div>
                <hr className='setting-hr'/>
              </div>
          </div>
          <div className='bt-settings'>
        <button onClick={()=>{navigate('/homepage', {replace:true})}}
                className='bt-setting-homepage'><FaHome style={{ marginRight: '5px' }}/>Homepage</button>
        <button onClick={()=>{navigate('/login', {replace:true})}}
                className='bt-setting-logout'><FaSignOutAlt style={{ marginRight: '5px' }}/>Logout</button>
      </div>
            {/* <button onClick={()=>{navigate('/login', {replace:true})}}
            className='bt-setting-logout'><FaSignOutAlt style={{ marginRight: '5px' }}/>Logout</button> */}
            <button onClick={()=>handleDeleteAccount()}
                className='bt-setting-delete'><MdDelete style={{ marginRight: '5px' }}/>
                Delete Accont
          </button>
          </div>
      </div>

    </div>
    </>
  );
}

export default Setting;