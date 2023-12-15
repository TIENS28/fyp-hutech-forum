import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CreatePost.css';
import Upload from '../Components/Upload';
import { useUser } from '../Components/UserContext';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handlePostSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/posts/newPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          content: content,
          thumbnail: "Thumbnail",
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      const result = await response.json();
      console.log('Post saved successfully:', result);
      navigate('/homepage', { replace: true });
    } catch (error) {
      console.error('Error saving post:', error.message);
      setError('Failed to save post. Please try again.');
    }
  };

  return (
    <div className="post-flex-container">
      <h1 className="post-h1">Create a post</h1>
      <hr className="post-hr" />
      <div className="ckeditor">
        <div className="create-post-section">
          <label className="create-post-label">Title:</label>
          <input
            className="create-post-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="create-post-section">
          <label className="create-post-label">Description:</label>
          <input
            className="create-post-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleChange}
          config={{
            toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'undo', 'redo'],
            autoParagraph: false,
            enterMode: CKEditor.ENTER_BR,
            shiftEnterMode: CKEditor.ENTER_P,
          }}
        />
      </div>
      <div className="create-posts">
        <div className="create-post-upload-image">
          <Upload onImageUpload={(image) => setUploadedImage(image)} />
        </div>

        <hr className="post-hrs" />

        <div className="button-post">
          <button
            className="bt-post-cancel"
            onClick={() => {
              navigate('/homepage', { replace: true });
            }}
          >
            Cancel
          </button>
          <button className="bt-post" onClick={handlePostSubmit}>
            Post
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default CreatePost;
