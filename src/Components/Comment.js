import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Comment.css';
import { useUser } from '../Components/UserContext';
import { FaRegComments } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

function Comment({ closeComment, postInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { editorData, uploadedImage } = location.state || {};
  const hasPostData = editorData || uploadedImage;

  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/posts/${postInfo.id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
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
        fetchComments();
        console.log('Comment submitted successfully');
        setCommentText('');
      } else {
        console.error('Error submitting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postInfo.id]);

  return (
    <div className='modalComment'>
      <div className='modalCommentContent'>
        <div className='comment-flex-container'>
          <div className='comment-user'>
            <h2>{postInfo.user.fullName} post </h2>
          </div>
          <div className='comment-cancel' onClick={() => closeComment(false)}>
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
                  <span className='numbers-interaction'>{postInfo.totalLikes}</span>
                  <span className='numbers-comments-interaction'>{comments.length} Comments</span>
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
                <div className='comments-section'>
                  <h3>Comments</h3>
                  <div className='comment-input-area'>
                    {/* Comment input area */}
                    <textarea className='textarea-input-comment'
                      placeholder='Write a comment...'
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    {/* Button to submit the comment */}
                    <button className='bt-submit-comment'onClick={handleCommentSubmit}>Submit Comment</button>
                  </div>
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.id}>
                        <strong>{comment.user && comment.user.fullName}</strong>:
                        <br></br>
                        {comment.content}
                        <br></br>
                        <br></br>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
