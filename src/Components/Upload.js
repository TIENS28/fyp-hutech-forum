import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFileImage } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Upload.css';

function Upload({ onImageUpload }) {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");

    const handleImageChange = ({ target: { files } }) => {
        if (files[0]) {
            setFileName(files[0].name);
            const imageURL = URL.createObjectURL(files[0]);
            setImage(imageURL);
            onImageUpload(imageURL); // Truyền đường dẫn hình ảnh lên component cha
        }
    };

    const handleDeleteImage = () => {
        setFileName("No selected File");
        setImage(null);
        onImageUpload(null); // Truyền null để xác định không có hình ảnh
    };

    return (
        <main>
            <form className='form-upload' onClick={() => document.querySelector(".input-field").click()}>
                <input type='file' accept='image/*' className='input-field' hidden onChange={handleImageChange} />

                {image ?
                    <img className='img' src={image} alt={fileName} />
                    :
                    <>
                        <FaCloudUploadAlt color='#1475cf' size={60} />
                        <p>Browse Files to upload</p>
                    </>
                }
            </form>

            <section className='uploaded-row'>
                <FaFileImage color='#1475cf' />
                <span className='upload-content'>
                    {fileName} -
                    <MdDelete onClick={handleDeleteImage} />
                </span>
            </section>
        </main>
    );
}

export default Upload;