import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ArtistCard.css';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className='artistCard' onClick={() => navigate(`/artist/${artist?.id}`)}>
      <img src={artist?.images[0].url} alt='artist-cover' />
      <div className='artistCard__info'>
        <h4>{artist?.name}</h4>
        <h5>{artist?.type}</h5>
      </div>
    </div>
  );
};

export default ArtistCard;
