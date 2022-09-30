import React from 'react';

import './LikedSongs.css';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import likedSongsIcon from '../../assets/likedSongs-icon.png';

const LikedSongs = ({ user, savedTracks }) => {
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
    </div>
  );
};

export default LikedSongs;
