import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Homepage.css';

import { FaRegComments }   from "react-icons/fa";
import { FaRegHeart }      from "react-icons/fa";
import { FaRegStar }       from "react-icons/fa";

import { AiFillHeart } from "react-icons/ai";

function Homepage({ setIsNavbarVisible }) {

  //Call API
  useEffect(() => {
    axios.get('http://localhost:8089/post-api')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  //ReactJS
    setIsNavbarVisible(true);
    const navigate = useNavigate();

  return (
    <div className ='home-flex-container'>
      <div className='create-post'>
        <img onClick={()=>{navigate('/personal', {replace:true})}}
             className='homepage-personal-page'
             src="Yone.jpg" 
             alt="Avatar"></img>
        <button onClick={()=>{navigate('/create', {replace:true})}}
                className="home-create-post" 
                type="submit" 
                value="create-post" >Create Post</button>
      </div>
      
      <div className='home-post'>
        <div className='home-user'>
          <img onClick={()=>{navigate('/tien', {replace:true})}}
          className='homepage-personal-page' src="Pikachu.jpg" alt="Avatar"></img>
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

        <div className='home-post'>
        <div className='home-user'>
          <img onClick={()=>{navigate('/personal', {replace:true})}}
          className='homepage-personal-page' src="Yone.jpg" alt="Avatar"></img>
          <span className='user-date'>NGUYEN TRANG CHI KIEM - Date: 7/10/2023</span>
        </div>
        <h1 className='home-post-title'>ReactJs</h1>
        <p className='home-post-content'>
          Final Year Project - Topic: HUTECH Social Network<br/>
          NGUYEN TRANG CHI KIEM <br/>
          TRAN NGUYEN TIEN
        </p>
        <img className='home-img-post'src="logo512.png" alt="Logo of HUTECH Social Network"></img>
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
  );
}

export default Homepage;