import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import './AlbumCard.css';

const AlbumCard = ({ track, recentTrack, chooseTrack, album }) => {
  const navigate = useNavigate();
  const [albumCardId, setAlbumCardId] = useState();
  const [artistId, setArtistId] = useState();

  const handlePlay = () => {
    if (track) chooseTrack(track);
    else if (recentTrack) chooseTrack(recentTrack);
    else if (album) chooseTrack(album);
  };

  const goToAlbum = () => {
    navigate(`/album/${albumCardId}`);
  };

  useEffect(() => {
    const trackId = () => {
      if (track) {
        setAlbumCardId(track?.id);
        setArtistId(track?.artists[0].id);
      }
      if (recentTrack) {
        setAlbumCardId(recentTrack?.album.id);
        setArtistId(recentTrack?.artists[0].id);
      }
      if (album) {
        setAlbumCardId(album?.id);
        setArtistId(album?.artists[0].id);
      }
    };

    trackId();
  }, [album, recentTrack, track]);

  return (
    <div className='albumCard'>
      <img
        src={track?.images[0].url || recentTrack?.album.images[0].url || album?.images[0].url}
        alt='album-cover'
        onClick={goToAlbum}
      />
      <div className='albumCard__trackInfo'>
        <h4 onClick={goToAlbum}>{track?.name || recentTrack?.name || album?.name}</h4>
        <h5 onClick={() => navigate(`/artist/${artistId}`)}>
          {track?.artists[0].name || recentTrack?.artists[0].name || album?.artists[0].name}
        </h5>
      </div>
      <BsFillPlayCircleFill className='albumCard-playButton' onClick={handlePlay} />
    </div>
  );
};

export default AlbumCard;
