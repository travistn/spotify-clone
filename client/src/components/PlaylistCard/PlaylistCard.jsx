import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';

import './PlaylistCard.css';

const PlaylistCard = ({ playlist, chooseTrack }) => {
  const navigate = useNavigate();

  return (
    <div className='playlistCard'>
      <img
        src={playlist?.images[0]?.url}
        alt='playlist-cover'
        onClick={() => navigate(`/playlist/${playlist?.id}`)}
      />
      <div className='playlistCard__info'>
        <h4 onClick={() => navigate(`/playlist/${playlist?.id}`)}>{playlist?.name}</h4>
        <h5>{`by ${playlist?.owner.display_name}`}</h5>
      </div>
      <div className='playlistCard-playButton' onClick={() => chooseTrack(playlist)}>
        <BsPlayFill color='black' />
      </div>
    </div>
  );
};

export default PlaylistCard;
