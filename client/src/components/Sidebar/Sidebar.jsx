import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { VscLibrary } from 'react-icons/vsc';

import './Sidebar.css';
import logo from '../../assets/logo-white.png';

const linkStyles = {
  fontSize: '15px',
  fontWeight: '700',
  textDecoration: 'none',
  color: 'var(--color-gray)',
};

const Sidebar = ({ userPlaylists }) => {
  const navigate = useNavigate();

  return (
    <div className='sidebar__container'>
      <img src={logo} alt='spotify-logo' className='sidebar-logo' onClick={() => navigate('/')} />
      <div className='sidebar__links'>
        <div className='sidebar-link'>
          <AiFillHome className='sidebar-homeIcon' />
          <Link to='/' style={linkStyles}>
            Home
          </Link>
        </div>
        <div className='sidebar-link'>
          <FiSearch className='sidebar-searchIcon' />
          <Link to='/search' style={linkStyles}>
            Search
          </Link>{' '}
        </div>
        <div className='sidebar-link'>
          <VscLibrary className='sidebar-libraryIcon' />
          <Link to='/library' style={linkStyles}>
            Your Library
          </Link>
        </div>
      </div>
      <div className='sidebar-playlists'>
        {userPlaylists?.items.map((playlist) => (
          <p>{playlist?.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
