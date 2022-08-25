import React from 'react';

import './AlbumCard.css';

const AlbumCard = ({ recentTrack }) => {
  return (
    <div className='albumCard'>
      <img src={recentTrack?.track.album.images[0].url} />
      <div className='albumCard__trackInfo'>
        <h4>{recentTrack?.track.name}</h4>
        <h5>{recentTrack?.track.artists[0].name}</h5>
      </div>
    </div>
  );
};

export default AlbumCard;

// card content div 157 x 248
// img 157 x 157
// card content bottom 157 x 62
