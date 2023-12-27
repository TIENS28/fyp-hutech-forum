import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Components/UserContext';
import './Homepage.css';
import { FaPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import './UserManagement.css';

function UserManagement({ setIsNavbarVisible }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/users/allUsers', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/users/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  useEffect(() => {
    setIsNavbarVisible(true);
    return () => {
      setIsNavbarVisible(false);
    };
  }, [setIsNavbarVisible]);

  return (
    <>
    <div className='navbar-left'>
        <img className='img-logoHUTECH' src="LogoHUTECH.jpg" alt="Logo"></img>
        <h1
          className='h1-HUTECH'
          onClick={() => {
            navigate('/homepage', { replace: true });
          }}
        >
          HUTECH
        </h1>
    </div>
    <div>
    </div>
    <div className="personal-flex-container">
        <div className='personal-post'>
            <div className='create-post'>
                <button onClick={()=>{navigate('/admin/home', {replace:true})}}
                        className="home-create-post" 
                        >Post management
                </button>
                <button onClick={()=>{navigate('/management/user', {replace:true})}}
                        className="home-create-post" 
                        >User management
                </button>
            </div>
            <div className='user-list'>
            {allUsers.map((userInfo) => (
            <div key={userInfo.id} className='user-info'>
              <div><img className='homepage-personal-page'
                  src={userInfo.avatarUrl} 
                  alt="Avatar"
                /></div>
              <div>Fullname: {userInfo.fullName}</div>
              <div>Email: {userInfo.email}</div>
              <div>Created Date: {userInfo.createdDate}</div>
              <button onClick={() => handleDeleteUser(userInfo.id)}>Delete User</button>
            </div>
          ))}
        </div>
        </div>
        
        <div className='form-personal'>
            <div className='personal'>
                <div className='background'></div>

                <img className='homepage-personal-page'
                  src={user.avatarUrl} 
                  alt="Avatar"
                />

                <div className='personal-informations'>
                    Fullname: {user.fullName}
                </div>
                <div className='personal-informations'>
                    Email: {user.email}
                </div>
                <div className='personal-informations'>
                    DOB: {user.dob}
                </div>
                <div className='personal-informations'>
                    Department: {user.department}
                </div>
                <div className='personal-informations'>
                    Student ID: {user.studentID}
                </div>
                <div className='upload'>
                    <button className='upload-image'>Upload Image</button>
                </div>
                <div className='add-social'>
                    <button className='bt-add-social'><FaPlus style={{ marginRight: '5px' }}/> Add social link </button>
                </div>

                <div className='seen-my-profile'>
                    <button onClick={()=>{navigate('/setting', {replace:true})}}
                    className='bt-profile'>My Profile</button>
                </div>

                <div className='personal-setting'>
                    <button onClick={()=>{navigate('/setting', {replace:true})}}
                    className='bt-setting'><IoSettingsSharp style={{ marginRight: '5px' }}/> Setting </button>
                </div>
            </div>
        </div>
    </div>
    
    </>
  );
}

export default UserManagement;