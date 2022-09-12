import React from 'react';

import './Login.css';
import logo from '../../assets/logo.png';

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20playlist-read-collaborative%20playlist-read-private`;

  return (
    <div className='login__container'>
      <div className='login__header'>
        <img src={logo} alt='spotify-logo' />
      </div>
      <div className='login-button'>
        <button>
          <a href={AUTH_URL}>Log In With Spotify</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
