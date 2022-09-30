import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Player from '../../components/Player/Player';
import useAuth from '../../hooks/useAuth';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import Search from '../Search/Search';
import Home from '../Home/Home';
import Album from '../Album/Album';
import Artist from '../Artist/Artist';
import Playlist from '../Playlist/Playlist';
import UserCard from '../../components/UserCard/UserCard';
import LikedSongs from '../LikedSongs/LikedSongs';

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const location = useLocation();

  const [playingTrack, setPlayingTrack] = useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [myTopArtists, setMyTopArtists] = useState([]);
  const [user, setUser] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [savedTracks, setSavedTracks] = useState([]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getMe().then((res) => setUser(res.body));
  }, [accessToken]);

  useEffect(() => {
    spotifyApi
      .getMyRecentlyPlayedTracks({ limit: 7 })
      .then((res) => setRecentlyPlayedTracks(res.body.items));
  }, [accessToken, location]);

  useEffect(() => {
    spotifyApi
      .getNewReleases({ limit: 7, offset: 0, country: 'US' })
      .then((res) => setNewReleases(res.body.albums.items));
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getMyTopArtists({ limit: 7 }).then((res) => setMyTopArtists(res.body.items));
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    spotifyApi.getUserPlaylists(user?.id).then((res) => setUserPlaylists(res.body));
  }, [user?.id]);

  useEffect(() => {
    spotifyApi.getMySavedTracks().then((res) => setSavedTracks(res.body.items));
  }, [accessToken, location]);

  return (
    <>
      <div className='dashboard__container'>
        <Sidebar userPlaylists={userPlaylists} />
        <div className='dashboard-user'>
          <UserCard user={user} />
        </div>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                recentlyPlayedTracks={recentlyPlayedTracks}
                newReleases={newReleases}
                myTopArtists={myTopArtists}
                chooseTrack={chooseTrack}
              />
            }
          />
          <Route path='/search' element={<Search setPlayingTrack={setPlayingTrack} />} />
          <Route
            path='/album/:id'
            element={
              <Album
                savedTracks={savedTracks}
                setSavedTracks={setSavedTracks}
                chooseTrack={chooseTrack}
              />
            }
          />
          <Route
            path='/artist/:id'
            element={
              <Artist
                savedTracks={savedTracks}
                setSavedTracks={setSavedTracks}
                chooseTrack={chooseTrack}
              />
            }
          />
          <Route
            path='/playlist/:id'
            element={
              <Playlist
                savedTracks={savedTracks}
                setSavedTracks={setSavedTracks}
                chooseTrack={chooseTrack}
              />
            }
          />
          <Route path='/collection'>
            <Route
              path='tracks'
              element={
                <LikedSongs
                  user={user}
                  savedTracks={savedTracks}
                  setSavedTracks={setSavedTracks}
                  chooseTrack={chooseTrack}
                />
              }
            />
          </Route>
        </Routes>
      </div>
      <Player accessToken={accessToken} track={playingTrack} />
    </>
  );
};

export default Dashboard;
