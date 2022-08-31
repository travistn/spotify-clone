import React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import './AlbumCard.css';

const AlbumCard = ({ track, recentTrack, chooseTrack }) => {
  const handlePlay = () => {
    if (track) chooseTrack(track);
    else if (recentTrack) chooseTrack(recentTrack);
  };

  return (
    <div className='albumCard'>
      <img src={track?.images[0].url || recentTrack?.album.images[0].url} alt='album-cover' />
      <div className='albumCard__trackInfo'>
        <h4>{track?.name || recentTrack?.name}</h4>
        <h5>{track?.artists[0].name || recentTrack?.artists[0].name}</h5>
      </div>
      <BsFillPlayCircleFill className='albumCard-playButton' onClick={handlePlay} />
    </div>
  );
};

export default AlbumCard;
