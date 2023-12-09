import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import './Comment.css';

import { FaRegComments }   from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegStar }       from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

function Comment({closeComment}) {

    const navigate = useNavigate();

    const location = useLocation();
    const { editorData, uploadedImage } = location.state || {};
    console.log({ editorData, uploadedImage });
    const hasPostData = editorData || uploadedImage;

    const [isLiked, setIsLiked] = useState(false);
    const handleClick = () => {
      setIsLiked(!isLiked);
    };

    return (
    <div className='modalComment'>
        <div className='modalCommentContent'>
            <div className='comment-flex-container'>
                <div className='comment-user'>
                    <h2>Bài viết của NGUYEN TRANG CHI KIEM</h2>
                </div>

                <div className='comment-cancel'
                    onClick={() => closeComment(false)}>
                    X
                </div>
            </div>
        
            <hr className='comment-hr'/>

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
          <FaRegComments className='FaRegComments'/>
          <FaRegStar className='FaRegStar'/>
        </div>
      </div>
     )}
      </div>
     </div>
        </div>
    </div>
  )
}

export default Comment