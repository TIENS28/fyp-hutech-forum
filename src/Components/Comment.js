import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Comment.css';
import { useUser } from '../Components/UserContext';
import { FaRegComments } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

function Comment({ closeComment, postInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { editorData, uploadedImage } = location.state || {};
  const hasPostData = editorData || uploadedImage;

  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/auth/posts/${postInfo.id}/addComment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentText,  
        }),
      });
  
      if (response.ok) {
        console.log('Comment submitted successfully');
        closeComment(false);
      } else {
        console.error('Error submitting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };
  

  return (
    <div className='modalComment'>
      <div className='modalCommentContent'>
        <div className='comment-flex-container'>
          <div className='comment-user'>
            <h2>{/* User's name or other identifier */}</h2>
          </div>
          <div
            className='comment-cancel'
            onClick={() => closeComment(false)}
          >
            X
          </div>
        </div>

        <hr className='comment-hr' />

        <div className='home-flex-containe'>
          {hasPostData && (
            <div className='flex-container-home-user'>
              <div className='img-home-user'>
                <img
                  onClick={() => {
                    navigate('/personal', { replace: true });
                  }}
                  className='homepage-personal-page'
                  src='Yone.jpg'
                  alt='Avatar'
                />
              </div>
              <div className='user-home-user'>
                <span className='user-date'>{user.fullName}</span>
              </div>
            </div>
          )}

          <div className='editor-content'>
            {postInfo && (
              <div className='editor-content'>
                <div dangerouslySetInnerHTML={{ __html: editorData }} />
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt='Uploaded'
                    style={{ width: '600px', height: '400px' }}
                  />
                )}
                <div className='home-interactions'>
                  <AiFillHeart className='number-interaction' />
                  <span className='numbers-interaction'>2</span>
                  <span className='numbers-comments-interaction'>5 Comments</span>
                </div>
                <div>
                  <hr className='home-hr' />
                </div>
                <div className='interaction'>
                  <FaHeart
                    className='FaHeart'
                    onClick={handleClick}
                    style={{ color: isLiked ? 'DeepPink' : 'Black' }}
                  />
                  <FaRegComments className='FaRegComments' />
                  <FaRegStar className='FaRegStar' />
                </div>
                {/* Comment input area */}
                <textarea
                  placeholder='Write a comment...'
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                {/* Button to submit the comment */}
                <button onClick={handleCommentSubmit} >Submit Comment</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
