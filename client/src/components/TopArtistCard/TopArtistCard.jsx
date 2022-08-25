import React from 'react';

import './TopArtistCard.css';

const TopArtistCard = ({ artist }) => {
  return (
    <div className='topArtistCard'>
      <img src={artist?.images[0].url} alt='artist-cover' />
      <div className='topArtistCard__info'>
        <h4>{artist?.name}</h4>
        <h5>{artist?.type}</h5>
      </div>
    </div>
  );
};

export default TopArtistCard;
