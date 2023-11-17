import React from 'react';
import { useNavigate } from 'react-router-dom'
import './PersonalPage.css'; 

import { MdOutlinePostAdd } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

function PersonalPage() {

    const navigate = useNavigate();

  return (
    <div className="personal-flex-container">
        <div className='personal-post'>
            <div className='create-post'>
                <img className='homepage-personal-page'
                     src="Yone.jpg" 
                     alt="Avatar"></img>
                <button onClick={()=>{navigate('/create', {replace:true})}}
                        className="home-create-post" 
                        type="submit" 
                        value="create-post" >Create Post</button>
             </div>

             <div className='users-post'>
                <p className='user-post'>Nguyen Trang Chi Kiem hasn't posted anything</p>
             </div>
        </div>

        <div className='form-personal'>
            <div className='personal'>
                <div className='background'></div>

                <div className='personal-informations'>
                    <img className='img-personal-page'
                         src="Yone.jpg" 
                         alt="Avatar"></img>
                </div>

                <div className='personal-informations'>
                    <p><h2>Nguyen Trang Chi Kiem</h2></p>
                </div>

                <div>
                    <p className='major'>Information Technology</p>
                </div>

                <div className='upload'>
                    <button className='upload-image'>Upload Image</button>
                </div>

                <div className='form-post'>
                    <div><MdOutlinePostAdd /><span style={{ marginLeft: '5px' }}>Posts</span><br/><span>0</span></div>
                    <div><IoPersonAddOutline /><span style={{ marginLeft: '5px' }}>Followers</span><br/><span>1</span></div>
                    <div><SlUserFollowing /><span style={{ marginLeft: '5px' }}>Following</span><br/><span>1</span></div>
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
  );
}

export default PersonalPage;