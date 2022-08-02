import React from 'react';
import { BsSpotify } from 'react-icons/bs';

import './Login.css';

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <div className='login__container'>
      <div className='login__header'>
        <BsSpotify className='spotify-icon' />
        <h1>Spotify</h1>
      </div>
      <div className='login-button'>
        <button>
          <a href={AUTH_URL}>Log In</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
