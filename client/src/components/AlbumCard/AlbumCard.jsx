import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import './AlbumCard.css';

const AlbumCard = ({ track, recentTrack, chooseTrack, album }) => {
  const navigate = useNavigate();
  const [albumCardId, setAlbumCardId] = useState();

  const handlePlay = () => {
    if (track) chooseTrack(track);
    else if (recentTrack) chooseTrack(recentTrack);
    else if (album) chooseTrack(album);
  };

  useEffect(() => {
    const trackId = () => {
      if (track) setAlbumCardId(track?.id);
      if (recentTrack) setAlbumCardId(recentTrack?.album.id);
      if (album) setAlbumCardId(album?.id);
    };

    trackId();
  }, [album, recentTrack, track]);

  return (
    <div className='albumCard' onClick={() => navigate(`/album/${albumCardId}`)}>
      <img
        src={track?.images[0].url || recentTrack?.album.images[0].url || album?.images[0].url}
        alt='album-cover'
      />
      <div className='albumCard__trackInfo'>
        <h4>{track?.name || recentTrack?.name || album?.name}</h4>
        <h5>{track?.artists[0].name || recentTrack?.artists[0].name || album?.artists[0].name}</h5>
      </div>
      <BsFillPlayCircleFill className='albumCard-playButton' onClick={handlePlay} />
    </div>
  );
};

export default AlbumCard;
