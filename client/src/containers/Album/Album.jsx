import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Album.css';
import { spotifyApi } from '../../reuseables/SpotifyApi';

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState();

  useEffect(() => {
    spotifyApi.getAlbum(id).then((res) => setAlbum(res.body));
  }, []);

  return (
    <div className='album__container'>
      <div className='album__header'>
        <img src={album?.images[0].url} />
        <div className='album__header-details'>
          <h5>{album?.album_type}</h5>
          <h3>{album?.name}</h3>
          <span>{`${album?.artists
            .map((artist) => artist.name)
            .join(' • ')} • ${album?.release_date.substring(0, 4)} • ${
            album?.total_tracks
          } song(s), `}</span>
        </div>
      </div>
    </div>
  );
};

export default Album;
