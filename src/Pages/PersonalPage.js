import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../Components/UserContext';

import { MdOutlinePostAdd } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { FaRegComments }   from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegStar }       from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

import { FaEllipsisH } from "react-icons/fa";
import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function UserProfile({closeComment}) {
  const { user } = useUser();
  console.log('User Data:', user);

  const navigate = useNavigate();

    const location = useLocation();
    const { editorData, uploadedImage } = location.state || {};
    console.log({ editorData, uploadedImage });
    const hasPostData = editorData || uploadedImage;

    const [isLiked, setIsLiked] = useState(false);
    const handleClick = () => {
      setIsLiked(!isLiked);
    };

    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
      if (openModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto'; 
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [openModal]);

    const [openComment, setOpenComment] = useState(false);
    useEffect(() => {
      if (openComment) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto'; 
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [openComment]);

  return (
    <>
    {openModal && <EditPost closeModal={setOpenModal}/>}
    {openComment && <Comment closeComment={setOpenComment}/>}
    <div>
      <h2>User Profile</h2>
      {user.fullName && <p>Full Name: {user.fullName}</p>}
      {user.email && <p>Email: {user.email}</p>}
    </div>
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
             <div className="home-flex-containe">
            {hasPostData && (
                <div className="flex-container-home-user">
          <div className="img-home-user">
            <img
              onClick={() => {
                navigate('/personal', { replace: true });
              }}
              className="homepage-personal-page"
              src="Yone.jpg"
              alt="Avatar"
            />
          </div>
          <div className="user-home-user">
            <span className="user-date">NGUYEN TRANG CHI KIEM </span>
            <br />
            <span className="user-date">Date: 7/10/2023 </span>
          </div>
          <div className="item-home-user">
            <FaEllipsisH className="fa-ellipsis-h"
                        onClick={() => {setOpenModal(true)}}/>
          </div>
        </div>
      )}

      <div className="editor-content">
        {hasPostData && (
      <div className="editor-content">
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
        {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: '600px', height: '400px' }}/>}
        <div className="home-interactions">
          <AiFillHeart className="number-interaction" />
          <span className="numbers-interaction">2</span>
          <span className="numbers-comments-interaction">5 Comments</span>
        </div>
        <div>
          <hr className="home-hr" />
        </div>
        <div className="interaction">
        <FaHeart className='FaHeart' 
          onClick={handleClick}
          style={{ color: isLiked ? 'DeepPink' : 'Black' }}/>
          <FaRegComments className='FaRegComments'
                         onClick={() => {setOpenComment(true)}}/>
          <FaRegStar className='FaRegStar'/>
        </div>
      </div>
     )}
      </div>
     </div>
                {/* <p className='user-post'>Nguyen Trang Chi Kiem hasn't posted anything</p> */}
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
                    <h2>Nguyen Trang Chi Kiem</h2>
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
    </>
  );
}

export default UserProfile;