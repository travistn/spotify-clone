import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsClock, BsPlayFill } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';

import './LikedSongs.css';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import likedSongsIcon from '../../assets/likedSongs-icon.png';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import { getAddedDate } from '../../reuseables/GetAddedDate';

const LikedSongs = ({ user, savedTracks, setSavedTracks, chooseTrack }) => {
  const navigate = useNavigate();
  const [likedTracks, setLikedTracks] = useState();

  const unsaveTrack = (e) => {
    spotifyApi.removeFromMySavedTracks([e.currentTarget.id]);
    setSavedTracks(savedTracks.filter((track) => track?.track.id !== e.currentTarget.id));
  };

  useEffect(() => {
    setLikedTracks(savedTracks?.map((tracks) => tracks?.track));
  }, [savedTracks]);

  return (
    <div className='likedSongs__container'>
      <div className='likedSongs__header__container'>
        <PageNavigation />
        <div className='likedSongs__header'>
          <img src={likedSongsIcon} alt='likedSongs-icon' />
          <div className='likedSongs__header-content'>
            <h4>Playlist</h4>
            <h1>Liked Songs</h1>
            <span>
              <img src={user?.images[0].url} alt='user-icon' />
              {`${user?.display_name} • ${savedTracks?.length} songs`}
            </span>
          </div>
        </div>
      </div>
      <div className='likedSongs-play__container'>
        <button className='likedSongs-playButton' onClick={() => chooseTrack(likedTracks)}>
          <BsPlayFill size='34' />
        </button>
      </div>
      <div className='likedSongs__tracks__container'>
        <div className='likedSongs__tracks-header'>
          <p>#</p>
          <p className='likedSongs__tracks-header-title'>Title</p>
          <p className='likedSongs__tracks-header-album'>Album</p>
          <p className='likedSongs__tracks-header-date'>Date Added</p>
          <BsClock className='likedSongs__tracks-clock' />
        </div>
        <div className='likedSongs__tracks'>
          {savedTracks?.map((track, index) => (
            <div className='likedSongs-track' key={track?.track.id}>
              <p className='likedSongs-trackNumber'>{index + 1}</p>
              <div className='likedSongs-trackTitle__container'>
                <img
                  src={track?.track.album.images[0].url}
                  alt='likedSongs-album-cover'
                  onClick={() => chooseTrack(track?.track)}
                />
                <div className='likedSongs-trackTitle-content'>
                  <p className='likedSongs-trackTitle' onClick={() => chooseTrack(track?.track)}>
                    {track?.track.name}
                  </p>
                  <p
                    className='likedSongs-trackArtist'
                    onClick={() => navigate(`/artist/${track?.track.artists[0].id}`)}>
                    {track?.track.artists[0].name}
                  </p>
                </div>
              </div>
              <p
                className='likedSongs-track-album'
                onClick={() => navigate(`/album/${track?.track.album.id}`)}>
                {track?.track.album.name}
              </p>
              <p className='likedSongs-track-addedDate'>{getAddedDate(track)}</p>
              <FiHeart
                id={track?.track.id}
                className='likedSongs-track-saved'
                onClick={unsaveTrack}
              />
              <p className='likedSongs-track-time'>
                {new Date(track?.track.duration_ms).toISOString().slice(14, 19)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
