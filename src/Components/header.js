import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/" className="header-icon">
        <FaArrowLeft />
      </Link>
      <div className="header-title">Your Header Title</div>
    </div>
  );
};

export default Header;
