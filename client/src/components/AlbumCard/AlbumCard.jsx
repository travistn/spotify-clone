import React from 'react';

import './AlbumCard.css';

const AlbumCard = ({ track, recentTrack }) => {
  return (
    <div className='albumCard'>
      <img src={track?.images[0].url || recentTrack?.album.images[0].url} alt='album-cover' />
      <div className='albumCard__trackInfo'>
        <h4>{track?.name || recentTrack?.name}</h4>
        <h5>{track?.artists[0].name || recentTrack?.artists[0].name}</h5>
      </div>
    </div>
  );
};

export default AlbumCard;
