import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Player from '../../components/Player/Player';
import useAuth from '../../hooks/useAuth';
import { spotifyApi } from '../../reuseables/SpotifyApi';

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <>
      <div className='dashboard__container'>
        <Sidebar />
        <Outlet />
      </div>
      <Player accessToken={accessToken} />
    </>
  );
};

export default Dashboard;
