import React from 'react';
import { useNavigate } from 'react-router-dom';

import './TopArtistCard.css';

const TopArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className='topArtistCard' onClick={() => navigate(`/artist/${artist?.id}`)}>
      <img src={artist?.images[0].url} alt='artist-cover' />
      <div className='topArtistCard__info'>
        <h4>{artist?.name}</h4>
        <h5>{artist?.type}</h5>
      </div>
    </div>
  );
};

export default TopArtistCard;
