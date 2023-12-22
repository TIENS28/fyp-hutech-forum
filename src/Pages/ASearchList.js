import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchPostList.css';
import { useUser } from '../Components/UserContext';
import { FaRegComments } from 'react-icons/fa';
import { FaHeart, FaRegStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function ASearchList({ setIsNavbarVisible }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pageNumber = parseInt(new URLSearchParams(location.search).get('page')) || 0;
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [likedStates, setLikedStates] = useState({});
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [openComment, setOpenComment] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setIsNavbarVisible(true);
    return () => {
      setIsNavbarVisible(false);
    };
  }, [setIsNavbarVisible]);

  const handleClick = (postId) => {
    setLikedStates((prevStates) => ({
      ...prevStates,
      [postId]: !prevStates[postId],
    }));
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/auth/posts/searchPost/${searchQuery}?page=${pageNumber}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery, pageNumber]);

  const renderContent = (content) => {
    return { __html: content.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  };

  const handleCommentClose = (postId) => {
    setOpenComment(null);
    setSearchResults((prevResults) => ({
      ...prevResults,
      content: prevResults.content.map((post) =>
        post.id === postId ? { ...post, totalComments: post.totalComments + 1 } : post
      ),
    }));
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/auth/posts/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSearchResults((prevResults) => ({
            ...prevResults,
            content: prevResults.content.filter((post) => post.id !== postId),
          }));
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
      {openModal && <EditPost closeModal={() => setOpenModal(false)} />}
        {openComment !== null && (
        <Comment
        closeComment={() => handleCommentClose(openComment.id)}          
        postInfo={openComment}
        />
      )}
      <div className="home-flex-container">
        <div className="home-flex-container">
          {searchResults?.content?.map((post) => (
            <div key={post.id} className="flex-container-home-user">
              <div className="editor-content">
                <div className="user-home-user">
                    <button
                        className="delete-post-btn"
                        onClick={() => handleDeletePost(post.id)}
                        >
                        Delete Post
                    </button>
                  <span className="user-date">At: {new Date(post.createdDate).toLocaleDateString()}</span>
                  <span className="user-date">{post.user.fullName}</span>
                </div>
                <h1>{post.title}</h1>
                {post.description && <p>{post.description}</p>}

                {post.content && (
                  <p dangerouslySetInnerHTML={renderContent(post.content)}></p>
                )}
                {post.thumbnailUrl && (
                  <img
                    src={post.thumbnailUrl}
                    alt="Post Thumbnail"
                    style={{ width: '600px', height: '400px' }}
                  />
                )}
                <div className="home-interactions">
                  <AiFillHeart className="number-interaction" />
                  <span className="numbers-comments-interaction">{post.totalComments} Comments</span>
                </div>
                <div>
                  <hr className="home-hr" />
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

        <div className="pagination-controls">
          <button className='bt-search'
            disabled={searchResults?.number === 0}
            onClick={() => {
              navigate(`/admin/search?page=${searchResults?.number - 1}&query=${searchQuery}`);
            }}>
            Previous
          </button>
          <span>
            Page {searchResults?.number + 1} of {searchResults?.totalPages}
          </span>
          <button className='bt-search'
            disabled={searchResults?.number === searchResults?.totalPages - 1}
            onClick={() => {
              navigate(`/admin/search?page=${searchResults?.number + 1}&query=${searchQuery}`);
            }}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default ASearchList;