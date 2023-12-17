import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Homepage.css';
import { useUser } from '../Components/UserContext';
import { FaEllipsisH } from 'react-icons/fa';
import { FaRegComments } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function Homepage({ setIsNavbarVisible }) {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log('User Data:', user);

  useEffect(() => {
    setIsNavbarVisible(true);
    return () => {
      setIsNavbarVisible(false);
    };
  }, [setIsNavbarVisible]);

  const location = useLocation();
  const { editorData, uploadedImage } = location.state || {};
  const hasPostData = editorData || uploadedImage;

  const [likedStates, setLikedStates] = useState({});

  const handleClick = (postId) => {
    setLikedStates((prevStates) => ({
      ...prevStates,
      [postId]: !prevStates[postId],
    }));
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

  const [openComment, setOpenComment] = useState(null);
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

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/posts/allPost');
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchAllPosts();
  }, []);

  const renderContent = (content) => {
    return { __html: content.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  };

  return (
    <>
      {openModal && <EditPost closeModal={setOpenModal} />}
      {openComment !== null && (
        <Comment
          closeComment={() => setOpenComment(null)}
          postInfo={openComment}
        />
      )}
      <div className="home-flex-container">
        <div className="create-post">
          <img
            onClick={() => {
              navigate('/personal', { replace: true });
            }}
            className='homepage-personal-page'
                  src={user.avatarUrl} 
                  alt="Avatar"
          ></img>
          <button
            onClick={() => {
              navigate('/create', { replace: true });
            }}
            className="home-create-post"
            type="submit"
            value="create-post"
          >
            Create Post
          </button>
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
            <span className="user-date">{user.fullName}</span>
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
      {allPosts.map((post) => (
          <div key={post.id} className="flex-container-home-user">
            
            <div className='editor-content'>
            <div className='user-home-user'>
            <span className='user-date'>At: {new Date(post.createdDate).toLocaleDateString()}</span>
            <span className='user-date'>{post.user.fullName}</span>
            </div>
              <h1>{post.title}</h1>
              {post.description && <p>{post.description}</p>}
              {post.thumbnail && <img src={post.thumbnail} alt="Post Thumbnail" style={{ width: '600px', height: '400px' }} />}
              {post.content && <p dangerouslySetInnerHTML={renderContent(post.content)}></p>}
              <div className='home-interactions'>
                <AiFillHeart className='number-interaction' />
                <span className='numbers-comments-interaction'>{post.totalComments} Comments</span>

              </div>
              <div>
                <hr className='home-hr' />
              </div>
              <div className="interaction">
                <FaHeart
                  className="FaHeart"
                  onClick={() => handleClick(post.id.toString())}
                  style={{ color: likedStates[post.id.toString()] ? 'DeepPink' : 'Black' }}
                />
                <FaRegComments
                      className="FaRegComments"
                      onClick={() => setOpenComment(post)}
                    />
                
                <FaRegStar className="FaRegStar" />
                
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
  </>
  );
}

export default Homepage;