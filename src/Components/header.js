// Header.js
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
        <FaArrowLeft onClick={() => {
              navigate('/homepage', { replace: true });
            }}/>
    </div>
  );
};

export default Header;
