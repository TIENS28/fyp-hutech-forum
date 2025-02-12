
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../Components/UserContext';
import './Homepage.css';
import { FaPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegComments }   from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegStar }       from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function AdminHomePage({ setIsNavbarVisible }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [openComment, setOpenComment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem('token');

  const [likedStates, setLikedStates] = useState(() => {
    const storedLikedStates = localStorage.getItem('likedStates');
    return storedLikedStates ? JSON.parse(storedLikedStates) : {};
  });

  useEffect(() => {
    if (allPosts.length > 0) {
      const initialLikedStates = allPosts.reduce((acc, post) => {
        acc[post.id.toString()] = post.liked;
        return acc;
      }, {});
      setLikedStates(initialLikedStates);
    }
  }, [allPosts]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/posts/like/${postId}/${user.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAllPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  totalLikes: post.liked ? post.totalLikes - 1 : post.totalLikes + 1,
                  liked: !post.liked,
                }
              : post
          )
        );
      } else {
        console.error('Failed to like post:', response.statusText);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };


  useEffect(() => {
    setIsNavbarVisible(true);
    return () => {
      setIsNavbarVisible(false);
    };
  }, [setIsNavbarVisible]);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

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


  const handleCommentClose = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/posts/post/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setAllPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, 
              totalComments: updatedPost.totalComments,
              totalLikes: updatedPost.totalLikes
            } : post
          )
        );
      }
    } catch (error) {
      console.error('Error fetching updated post data:', error);
    }

    setOpenComment(null);
  };

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
  
  
  const renderContent = (content) => {
    return { __html: content.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/posts/allPost', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // delete post api
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/posts/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

        console.log('Post deleted successfully');
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <>
    {openModal && <EditPost closeModal={setOpenModal} />}
    {openComment !== null && (
        <Comment
        closeComment={() => handleCommentClose(openComment.id)}          
        postInfo={openComment}
        />
      )}
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
    <div className="personal-flex-container">
        <div className='personal-post'>
            <div className='create-post'>
            <img className='homepage-personal-page'
                  src={user.avatarUrl} 
                  alt="Avatar"
                />
                <button onClick={()=>{navigate('/create', {replace:true})}}
                        className="home-create-post" 
                        type="submit" 
                        value="create-post" >Create Post</button>
            </div>

            <div className="editor-content">
            {allPosts.map((post) => (
                <div key={post.id} className="flex-container-home-user">
                    
                    <div className='editor-content'>
                    <div className='user-home-user'>
                    <button
                        className="delete-post-btn"
                        onClick={() => handleDeletePost(post.id)}
                        >
                        Delete Post
                    </button>
                    <span className='user-date'>At: {new Date(post.createdDate).toLocaleDateString()}</span>
                    <span className='user-date'>{post.user.fullName}</span>
                    </div>
                    <h1 className='post-title'>{post.title}</h1>
                    {post.description && <p className='post-description'>{post.description}</p>}
                    {post.content && <p dangerouslySetInnerHTML={renderContent(post.content)}></p>}
                    {post.thumbnailUrl && <img src={post.thumbnailUrl} alt="Post Thumbnail" />}
                    <div className='home-interactions'>
                        <AiFillHeart className='number-interaction' />{post.totalLikes}
                        <span className='numbers-comments-interaction'>{post.totalComments} Comments</span>
                    </div>
                    <div>
                        <hr className='home-hr' />
                    </div>
                    <div className="interaction">
                        <FaHeart
                          className="FaHeart"
                          onClick={() => handleLike(post.id)}
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

export default AdminHomePage;