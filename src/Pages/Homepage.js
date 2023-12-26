import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Homepage.css';
import { useUser } from '../Components/UserContext';
import { FaEllipsisH, FaRegComments, FaHeart, FaRegStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function Homepage({ setIsNavbarVisible }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const location = useLocation();
  const { editorData, uploadedImage } = location.state || {};
  const hasPostData = editorData || uploadedImage;

  const [openModal, setOpenModal] = useState(false);
  const [openComment, setOpenComment] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
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


  useEffect(() => {
    setIsNavbarVisible(true);
    return () => {
      setIsNavbarVisible(false);
    };
  }, [setIsNavbarVisible]);

  useEffect(() => {
    if (openModal || openComment !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal, openComment]);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/posts/allPost', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      const storedLikedStates = localStorage.getItem('likedStates');
      const initialLikedStates = storedLikedStates ? JSON.parse(storedLikedStates) : {};

      setAllPosts(data);
      setLikedStates(initialLikedStates);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('likedStates', JSON.stringify(likedStates));
  }, [likedStates]);

  const renderContent = (content) => {
    return { __html: content.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  };

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
      console.error('Error liking post:', error);
    }
  };
  
  
  

  return (
    <>
      {openModal && <EditPost closeModal={setOpenModal} />}
      {openComment !== null && (
        <Comment closeComment={() => handleCommentClose(openComment.id)} postInfo={openComment} />
      )}
      <div className="home-flex-container">
        <div className="create-post">
          <img
            onClick={() => {
              navigate('/personal', { replace: true });
            }}
            className="homepage-personal-page"
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
                  src={user.avatarUrl}
                  alt="Avatar"
                />
              </div>
              <div className="user-home-user">
                <span className="user-date">{user.fullName}</span>
              </div>
              <div className="item-home-user">
                <FaEllipsisH className="fa-ellipsis-h" onClick={() => setOpenModal(true)} />
              </div>
            </div>
          )}
          <div className="editor-content">
            {allPosts &&
              allPosts.map((post) => (
                <div key={post.id} className="flex-container-home-user">
                  <div className="editor-content">
                    <div className="user-home-user">
                      <span className="user-date">
                        At: {new Date(post.createdDate).toLocaleDateString()}
                      </span>
                      <span className="user-date">{post.user.fullName}</span>
                    </div>
                    <div>
                    <h1 className='post-title'>{post.title}</h1>
                    {post.description && <p className='post-description'>{post.description}</p>}
                    </div>
                    {post.content && (
                      <p dangerouslySetInnerHTML={renderContent(post.content)}></p>
                    )}
                    {post.thumbnailUrl && (
                      <img
                        src={post.thumbnailUrl}
                        alt="Post Thumbnail"
                        style={{ width: '580px', height: '400px' }}
                      />
                    )}
                    <div className="home-interactions">
                      <AiFillHeart className="number-interaction" />{post.totalLikes}

                      <span className="numbers-comments-interaction">
                        {post.totalComments} Comments
                      </span>
                    </div>
                    <div>
                      <hr className="home-hr" />
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
      </div>
    </>
  );
}

export default Homepage;
