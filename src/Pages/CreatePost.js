import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom'
import './CreatePost.css';

function CreatePost() {

    const navigate = useNavigate();
    const [content, setContent] = useState('');
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };

  return (
    <div className="post-flex-container">
        <h1 className='post-h1' >Create a post</h1>
        <hr className='post-hr'/>
        <div className='create-posts'>
            <input className='input-title' type='text' placeholder="Title"></input>
            <textarea className="input-content"
                      value={content}
                      onChange={handleContentChange}
                      autoFocus
                      placeholder="Enter content ..."/>
            <div className='create-post-upload-image'>
                <p>Add photos or videos to your posts</p>
                <span className='bt-upload-img'>
                    <button className='upload-img'>Upload</button>
                </span>
            </div>
            <hr className='post-hrs'/>
            <div className='button-post'>
                <button className='bt-post-cancel'
                        onClick={()=>{navigate('/homepage', {replace:true})}}>Cancle</button>
                <button className='bt-post'>Post</button>
            </div>
        </div>

    </div>
  );
}

export default CreatePost;