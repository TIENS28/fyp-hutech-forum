import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Components/UserContext';
import './UpdateProfile.css';

import { MdEdit } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { IoMdArrowRoundBack } from 'react-icons/io';

function UpdateProfile() {
  const { user, setUserData } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(user);

  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dob: user.dob,
    department: user.department,
    studentID: user.studentID,
    avatarUrl: user.avatarUrl,
    avatar: user.avatar,
  });
  const [editFields, setEditFields] = useState({
    firstName: false,
    lastName: false,
    avatarUrl: false,
    department: false,
    DOB: false,
    studentID: false,
    avatar: false,
  });

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('id', updatedUser.id);
      formData.append('firstName', updatedUser.firstName);
      formData.append('lastName', updatedUser.lastName);
      formData.append('email', updatedUser.email);
      formData.append('DOB', updatedUser.dob);
      formData.append('department', updatedUser.department);
      formData.append('studentID', updatedUser.studentID);
  
      if (updatedUser.avatar) {
        formData.append('avatar', updatedUser.avatar);
      }
  
      const response = await fetch('http://localhost:5001/api/auth/users/updateProfile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData(updatedUserData);      
        if (updatedUserData.role.roleCode === 'ADMIN') {
          navigate('/admin/home', { replace: true });
        } else {
          navigate('/personal', { replace: true });
        }
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  
  const handleEditField = (field) => {
    setEditFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  
    if (editFields[field]) {
      setUpdatedUser((prevUser) => {
        const newValue = user[field];
        return {
          ...prevUser,
          [field]: newValue !== prevUser[field] ? newValue : prevUser[field],
        };
      });
    }
  };
  
  return (
    <>
      <div className='setting-flex-container'>
        <div>
          <h2 className='setting-h2'>Profile</h2>
          <div className='form-setting'>
            <p className='setting-text'>Avatar</p>
            <div className='setting-information'>
              {editFields.avatar ? (
              
              <input
                type='file'
                onChange={(e) => setUpdatedUser({ ...updatedUser, avatar: e.target.files[0] })}
              />
              
              ) : (
                <p className='setting-texts'>{user.avatarUrl}</p>
              )}
              <span className='setting-edit' onClick={() => handleEditField('avatar')}>
                <MdEdit />
              </span>
            </div>
            <hr className='setting-hr' />
            
            <p className='setting-text'>First Name</p>
            <div className='setting-information'>
              {editFields.firstName ? (
                <input
                  type='text'
                  value={updatedUser.firstName}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                />
              ) : (
                <p className='setting-texts'>{user.firstName}</p>
              )}
              <span className='setting-edit' onClick={() => handleEditField('firstName' || ' ')}>
                <MdEdit />
              </span>
            </div>
            <hr className='setting-hr' />

            <p className='setting-text'>Last Name</p>
            <div className='setting-information'>
              {editFields.lastName ? (
                <input
                  type='text'
                  value={updatedUser.lastName}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                />
              ) : (
                <p className='setting-texts'>{user.lastName}</p>
              )}
              <span className='setting-edit' onClick={() => handleEditField('lastName' || ' ')}>
                <MdEdit />
              </span>
            </div>
            <hr className='setting-hr' />

            <p className='setting-text'>Department</p>
            <div className='setting-information'>
              {editFields.department ? (
                <input
                  type='text'
                  value={updatedUser.department}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, department: e.target.value })}
                />
              ) : (
                <p className='setting-texts'>{user.department}</p>
              )}
              <span className='setting-edit' onClick={() => handleEditField('department')}>
                <MdEdit />
              </span>
            </div>
            <hr className='setting-hr' />

            <p className='setting-text'>DOB</p>
              <div className='setting-information'>
                {editFields.DOB ? (
                  <input
                    type='text'
                    value={updatedUser.dob}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, dob: e.target.value })}
                  />
                ) : (
                  <p className='setting-texts'>{user.dob}</p>
                )}
                <span className='setting-edit' onClick={() => handleEditField('DOB')}>
                  <MdEdit />
                </span>
              </div>
              <hr className='setting-hr' />


            <p className='setting-text'>Student ID</p>
            <div className='setting-information'>
              {editFields.studentID ? (
                <input
                  type='text'
                  value={updatedUser.studentID || ''}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, studentID: e.target.value })}
                />
              ) : (
                <p className='setting-texts'>{user.studentID}</p>
              )}
              <span className='setting-edit' onClick={() => handleEditField('studentID' || ' ')}>
                <MdEdit />
              </span>
            </div>
            <hr className='setting-hr' />
          </div>
        </div>

        <div className='bt-settings'>
          <button
            onClick={() => {
              navigate('/setting', { replace: true });
            }}
            className='bt-update-setting'
          >
            <IoMdArrowRoundBack style={{ marginRight: '5px' }} />Back
          </button>
          <button onClick={handleUpdateProfile} className='bt-update-profile'>
            <RxUpdate style={{ marginRight: '5px' }} />Update Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
