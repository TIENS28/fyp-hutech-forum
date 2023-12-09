import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
//import axios from 'axios';
import './Homepage.css';

import { FaEllipsisH } from "react-icons/fa";
import { FaRegComments }   from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegStar }       from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function Homepage({ setIsNavbarVisible }) {

  setIsNavbarVisible(true);
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

  //Call API
  // useEffect(() => {
  //   axios.get('http://localhost:8089/post-api')
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data from API:', error);
  //     });
  // }, []);

  //ReactJS

  return (
  <>
    {openModal && <EditPost closeModal={setOpenModal}/>}
    {openComment && <Comment closeComment={setOpenComment}/>}
    <div className ='home-flex-container'>
      <div className='create-post'>
        <img onClick={()=>{navigate('/personal', {replace:true})}}
             className='homepage-personal-page'
             src="Yone.jpg" 
             alt="Avatar"></img>
        <button onClick={()=>{navigate('/create', {replace:true})}}
                className="home-create-post" 
                type="submit" 
                value="create-post" >Create Post</button>
      </div>
      
      <div className="home-flex-containe">
      {hasPostData && (
        <div className="flex-container-home-user">
          <div className="img-home-user">
            <img
              onClick={() => {
                navigate('/personal', { replace: true, state: { editorData, uploadedImage } });
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

     <div className='home-post'>
      <div className='flex-container-home-user'>
        <div className='img-home-user'><img onClick={()=>{navigate('/tien', {replace:true})}}
          className='homepage-personal-page' src="Pikachu.jpg" alt="Avatar"></img></div>
        <div className='user-home-user'>
          <span className='user-date'>TRAN NGUYEN TIEN </span><br/>
          <span className='user-date'>Date: 7/10/2023 </span>
        </div>
        <div className='item-home-user'><FaEllipsisH className='fa-ellipsis-h'/></div>
      </div>
      <h1 className='home-post-title'>Spring Boot</h1>
      <p className='home-post-content'>
        Final Year Project - Topic: HUTECH Social Network<br/>
        NGUYEN TRANG CHI KIEM <br/>
        TRAN NGUYEN TIEN
      </p>
      <div className='home-interactions'>
        <AiFillHeart className='number-interaction'/>
        <span className='numbers-interaction'>2</span>
        <span className='numbers-comments-interaction'>5 Commnets</span>
      </div>
      <div><hr className='home-hr'/></div>
      <div className='interaction'>
        <FaHeart className='FaHeart' 
          onClick={handleClick}
          style={{ color: isLiked ? 'DeepPink' : 'Black' }}/>
          <FaRegComments className='FaRegComments'/>
          <FaRegStar className='FaRegStar'/>
      </div>
      </div>
    </div>
  </>
  );
}

export default Homepage;