import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { VscLibrary } from 'react-icons/vsc';

import './Sidebar.css';
import logo from '../../assets/logo-white.png';

const Sidebar = () => {
  return (
    <div className='sidebar__container'>
      <img src={logo} alt='spotify-logo' className='sidebar-logo' />
      <div className='sidebar__links'>
        <div className='sidebar-link'>
          <AiFillHome className='sidebar-homeIcon' />
          <h5>Home</h5>
        </div>
        <div className='sidebar-link'>
          <FiSearch className='sidebar-searchIcon' />
          <h5>Search</h5>
        </div>
        <div className='sidebar-link'>
          <VscLibrary className='sidebar-libraryIcon' />
          <h5>Your Library</h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
