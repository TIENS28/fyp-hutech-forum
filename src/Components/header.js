// Header.js
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

import { FaHome } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
        {/* <FaArrowLeft onClick={() => {
              navigate('/homepage', { replace: true });
            }}/> */}
        <button onClick={()=>{navigate('/homepage', {replace:true})}}
                className='bt-setting-homepage'><FaHome style={{ marginRight: '5px' }}/>Homepage</button>
    </div>
  );
};

export default Header;