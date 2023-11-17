import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css';

import { FaPlus } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { FaBell  } from "react-icons/fa";

import IconButton from '@mui/material/IconButton';
import {Tooltip} from '@mui/material'
import Dropdown from './Dropdown';

function Navbar () {

    const navigate = useNavigate();
    
  return (
    <div className='navbar'>
        <div className='navbar-left'>
            <img className='img-logoHUTECH' src="LogoHUTECH.jpg" alt="Logo"></img>
            <h1 className='h1-HUTECH'
                onClick={()=>{navigate('/homepage', {replace:true})}}>HUTECH</h1>
        </div>

        <div className='navbar-center'>
            <input className='search' type='search' placeholder='Search...'></input>
        </div>

        <div className='navbar-right'>
            <Link to='/create'>
                <Tooltip title="Create Post" placement="bottom">
                    <IconButton className='icons'>
                        <FaPlus />
                </IconButton>
            </Tooltip>
            </Link>
            <Tooltip title="Chat" placement="bottom">
                <IconButton className='icons'>
                    <FaCommentDots />
                </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" placement="bottom">
                <IconButton className='icons'>
                    <FaBell />
                </IconButton>
            </Tooltip>
            <Dropdown/>
        </div>
    </div>
  );
}

export default Navbar;