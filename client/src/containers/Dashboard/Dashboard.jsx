import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Player from '../../components/Player/Player';
import useAuth from '../../hooks/useAuth';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import Search from '../Search/Search';
import Home from '../Home/Home';

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  const [playingTrack, setPlayingTrack] = useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState();
  const [newReleases, setNewReleases] = useState();

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi
      .getMyRecentlyPlayedTracks({ limit: 7 })
      .then((res) => setRecentlyPlayedTracks(res.body.items));
  }, [accessToken]);

  return (
    <>
      <div className='dashboard__container'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home recentlyPlayedTracks={recentlyPlayedTracks} />} />
          <Route path='/search' element={<Search setPlayingTrack={setPlayingTrack} />} />
        </Routes>
      </div>
      <Player accessToken={accessToken} track={playingTrack} />
    </>
  );
};

export default Dashboard;
