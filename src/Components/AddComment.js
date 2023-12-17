// AddComment.js
import React, { useState } from 'react';

const AddComment = ({ postId, addComment }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = async () => {
    await addComment(postId, commentContent);
    setCommentContent('');
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your comment here..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Comment</button>
    </div>
  );
};

export default AddComment;
