// Import necessary libraries and components
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaPlus, FaCommentDots, FaBell, FaSearch } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dropdown from './Dropdown';
import { FaHome } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Redirect to the SearchPostList page with the search query
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        {/* Replace the logo with a button that navigates to the homepage */}
        {/* <FaHome
          className='homepage-button'
          onClick={() => {
            navigate('/homepage', { replace: true });
          }}
        /> */}
        
        <img className='img-logoHUTECH' src="LogoHUTECH.jpg" alt="Logo"></img>
        <h1
          className='h1-HUTECH'
          onClick={() => {
            navigate('/homepage', { replace: true });
          }}
        >
          HUTECH
        </h1>
      </div>

      <div className='navbar-center'>
        <div className='search-container'>
          <input
            className='search'
            type='search'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Tooltip title='Search' placement='bottom'>
            <IconButton className='search-icon' onClick={handleSearch}>
              <FaSearch />
            </IconButton>
          </Tooltip>
        </div>
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
        <Dropdown />
      </div>
    </div>
  );
}

export default Navbar;
