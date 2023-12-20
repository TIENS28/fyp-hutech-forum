import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchPostList.css';
import { FaEllipsisH, FaRegComments, FaHeart, FaRegStar, AiFillHeart } from 'react-icons/all';
import EditPost from '../Components/EditPost';
import Comment from '../Components/Comment';

function SearchPostList({ setIsNavbarVisible }) {
  const navigate = useNavigate();
  const { query } = useParams();
  const [likedStates, setLikedStates] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openComment, setOpenComment] = useState(null);
  const [searchPosts, setSearchPosts] = useState([]);

  useEffect(() => {
    setIsNavbarVisible(true);
    return () => {
      setIsNavbarVisible(false);
    };
  }, [setIsNavbarVisible]);

  useEffect(() => {
    const fetchSearchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/auth/posts/searchPost/${query}`);
        const data = await response.json();
        setSearchPosts(data);
      } catch (error) {
        console.error('Error fetching search posts:', error);
      }
    };

    fetchSearchPosts();
  }, [query]);

  const handlePagination = (page) => {
    // Handle pagination logic if needed
    console.log('Go to page', page);
  };

  const renderContent = (content) => {
    return { __html: content.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  };

  return (
    <>
      {openModal && <EditPost closeModal={() => setOpenModal(false)} />}
      {openComment !== null && (
        <Comment closeComment={() => setOpenComment(null)} postInfo={openComment} />
      )}
      <div className="search-post-list">
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

        <div className="search-post-content">
          {searchPosts.length === 0 ? (
            <p>No posts found</p>
          ) : (
            searchPosts.map((post) => (
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
            ))
          )}

          <div className="pagination">
            <button onClick={() => handlePagination('prev')}>Previous</button>
            <button onClick={() => handlePagination(1)}>1</button>
            <button onClick={() => handlePagination(2)}>2</button>
            <button onClick={() => handlePagination('next')}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPostList;
