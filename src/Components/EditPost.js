import React from 'react'
import './EditPost.css';

function EditPost({closeModal}) {
  return (
    <div className='modalEditPostBackground'>
        <div className='modalEditPostContent'>
            <div className='postEdit'>
                Edit
            </div>
            <hr className='hrEditPost'/>
            <div className='postDelete'>
                Delete
            </div>
            <hr className='hrEditPost'/>
            <div className='postReport'>
                Report
            </div>
            <hr className='hrEditPost'/>
            <div className='postSave'>
                Save
            </div>
            <hr className='hrEditPost'/>
            <div className='postCancel'
                 onClick={() => closeModal(false)}>
                Cancel
            </div>
        </div>
    </div>
  )
}

export default EditPost