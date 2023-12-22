import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './Dropdown.css';
import { useUser } from '../Components/UserContext';
import { FaChevronDown } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiOutlineFileExclamation } from "react-icons/ai";
import { FaSignOutAlt }    from "react-icons/fa";

function Dropdown() {
  const { user } = useUser();
  console.log('User Data:', user);
    const [open, setOpen] = useState(false)

  return (
    <div className="Dropdowss">
    <div className='menu-container'>
      <div className='menu-trigger' >
        {/* <img className='img-username' src="Yone.jpg" alt="Avatar"></img> */}
        <img className='img-username'
                  src={user.avatarUrl} 
                  alt="Avatar"
                />
      </div>

      <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
        <h3>HUTECH FORUM<br/><span>Final Year Project</span></h3>
        <ul>
          <li className='dropdownItem'>
            <span className='Icon-text-dropdown'> <FaRegUserCircle/> </span>
            <Link to='/personal'> Personal Page </Link>
          </li>
          <li className='dropdownItem'>
            <span className='Icon-text-dropdown'> <FaRegEdit/> </span>
            <Link to='/update'> Edit Profile </Link>
          </li>
          <li className='dropdownItem'>
            <span className='Icon-text-dropdown'> <HiOutlineCog6Tooth/> </span>
            <Link to='/setting'> Setting </Link>
          </li>
          <li className='dropdownItem'>
            <span className='Icon-text-dropdown'> <FaRegQuestionCircle/> </span>
            <Link to='/setting'> Helps </Link>
          </li>
          <li className='dropdownItem'>
            <span className='Icon-text-dropdown'> <AiOutlineFileExclamation/> </span>
            <Link to='/setting'> Contribute Opinions </Link>
          </li>
          <li className='dropdownItem'>
            <span className='Icon-text-dropdown'> <FaSignOutAlt/> </span>
            <Link to='/'> Logout </Link>
          </li>
        </ul>
      </div>

      <div className='user' onClick={()=>{setOpen(!open)}}>
        <span>{user.fullName}<span className='item-dropdown'><FaChevronDown/></span></span>
      </div>
    </div>
  </div>
);
}

export default Dropdown;