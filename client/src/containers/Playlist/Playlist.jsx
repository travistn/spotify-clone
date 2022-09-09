import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Playlist.css';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import { convertMilliseconds } from '../../reuseables/ConvertMilliseconds';
import PageNavigation from '../../components/PageNavigation/PageNavigation';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState();

  const playlistDuration = playlist?.tracks.items.reduce((total, track) => {
    return total + track?.track.duration_ms;
  }, 0);

  useEffect(() => {
    spotifyApi.getPlaylist(id).then((res) => setPlaylist(res.body));
  }, [id]);

  return (
    <div className='playlist__container'>
      <PageNavigation />
      <div className='playlist__header'>
        <img src={playlist?.images[0].url} alt='playlist-cover' className='playlist-cover' />
        <div className='playlist__header-details'>
          <h5>{playlist?.type}</h5>
          <h3>{playlist?.name}</h3>
          <div className='playlist__header-bottom'>
            <p>{playlist?.description}</p>
            <span>{`${playlist?.owner?.display_name} • ${playlist?.followers.total} likes • ${
              playlist?.tracks.total
            } songs • ${convertMilliseconds(playlistDuration)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
