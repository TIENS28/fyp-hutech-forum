import React, { useState } from 'react';  //import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './CreatePost.css';
import Upload from '../Components/Upload';

function CreatePost () {

    const [editorData, setEditorData] = useState("<p>Please input your post content here!</p>");
    const [uploadedImage, setUploadedImage] = useState(null);
    const navigate = useNavigate();

  return (
    <div className="post-flex-container">
        <h1 className='post-h1' >Create a post</h1>
        <hr className='post-hr'/>
        <div className ='ckeditor'>
        <CKEditor 
                    editor={ClassicEditor}
                    data={editorData}
                    // data="<p>Please input your post content here!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                      }}
                    // onChange={(event, editor) => {
                    //     const data = editor.getData();
                    //     console.log({ event, editor, data });
                    // }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                    config={{
                        toolbar: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            '|',
                            // 'bulletedList',
                            // 'numberedList',
                            '|',
                            'link',
                            'undo',
                            'redo',
                        ],
                    }}
                />
        </div>
        
        <div className='create-posts'>
            <div className='create-post-upload-image'>
                <Upload onImageUpload={(image) => setUploadedImage(image)}/>
            </div>
            
            <hr className='post-hrs'/>
            <div className='button-post'>
                <button className='bt-post-cancel'
                        onClick={()=>{navigate('/homepage', {replace:true})}}>Cancle</button>
                <button
                    className='bt-post'
                    onClick={() => {
                        console.log({ editorData, uploadedImage });
                    navigate('/homepage', { replace: true, state: { editorData, uploadedImage } });
                    }}
                    >Post</button>
                {/* <button className='bt-post'
                onClick={()=>{navigate('/homepage', {replace:true})}}>Post</button> */}
            </div>
        </div>

    </div>
  );
}

export default CreatePost;