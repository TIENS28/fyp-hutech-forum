import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Personal.css'; 

import { MdOutlinePostAdd } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { FaRegComments }   from "react-icons/fa";
import { FaRegHeart }      from "react-icons/fa";
import { FaRegStar }       from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

function Personal() {

    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);

    const handleButtonClick = () => {
        setIsFollowing(prevState => !prevState);
    };

  return (
    <div className="personal-flex-container">
        <div className='personal-post'>
            <div className='create-post'>
                <img className='homepage-personal-page'
                     src="Pikachu.jpg" 
                     alt="Avatar"></img>
                <button onClick={()=>{navigate('/create', {replace:true})}}
                        className="home-create-post" 
                        type="submit" 
                        value="create-post" >Create Post</button>
             </div>

             <div className='home-flex-containers'>
                 <div className='home-post'>
                    <div className='home-user'>
                        <img className='homepage-personal-page' src="Pikachu.jpg" alt="Avatar"></img>
                        <span className='user-date'>TRAN NGUYEN TIEN - Date: 7/10/2023</span>
                    </div>
                    <h1 className='home-post-title'>Spring Boot</h1>
                    <p className='home-post-content'>
                        Final Year Project - Topic: HUTECH Social Network<br/>
                        NGUYEN TRANG CHI KIEM <br/>
                        TRAN NGUYEN TIEN
                    </p>
                    <div className='home-interactions'>
                        <AiFillHeart className='number-interaction'/>
                        <span className='numbers-interaction'>2</span>
                        <span className='numbers-comments-interaction'>5 Commnets</span>
                    </div>
                    <div>
                        <hr className='home-hr'/>
                     </div>
                     <div className='interaction'>
                        <FaRegHeart/>
                        <FaRegComments/>
                         <FaRegStar/>
                    </div>
                </div>
             </div>
        </div>

        <div className='form-personal'>
            <div className='personal'>
                <div className='background'></div>

                <div className='personal-informations'>
                    <img className='img-personal-page'
                         src="Pikachu.jpg" 
                         alt="Avatar"></img>
                </div>

                <div className='personal-informations'>
                    <p><h2>Tran Nguyen Tien</h2></p>
                </div>

                <div>
                    <p className='major'>Information Technology</p>
                </div>

                <div className='upload'>
                    <button className={`bt-follow ${isFollowing ? 'following' : ''}`}
                            onClick={handleButtonClick}>{isFollowing ? 'The Following' : 'Follow'}
                    </button>
                </div>

                <div className='form-post'>
                    <div><MdOutlinePostAdd /><span style={{ marginLeft: '5px' }}>Posts</span><br/><span>1</span></div>
                    <div><IoPersonAddOutline /><span style={{ marginLeft: '5px' }}>Followers</span><br/><span>1</span></div>
                    <div><SlUserFollowing /><span style={{ marginLeft: '5px' }}>Following</span><br/><span>1</span></div>
                </div>

            </div>
        </div>
    </div>
  );
}

export default Personal;