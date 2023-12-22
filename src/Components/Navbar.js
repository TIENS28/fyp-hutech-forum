import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useUser } from '../Components/UserContext';
import { FaPlus, FaCommentDots, FaBell, FaSearch } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dropdown from './Dropdown';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  const handleSearch = () => {
    const isAdmin = user?.role?.roleCode === 'ADMIN';
    let searchUrl;
    if (isAdmin) {
      searchUrl = `/admin/search?query=${encodeURIComponent(searchQuery)}`;
    } else {
      searchUrl = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
    console.log('Search URL:', searchUrl);
    navigate(searchUrl);
  };

  
  return (
    <div className='navbar'>
      <div className='navbar-left'>
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
