import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsClock } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';

import './Playlist.css';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import { convertMilliseconds } from '../../reuseables/ConvertMilliseconds';
import PageNavigation from '../../components/PageNavigation/PageNavigation';

const Playlist = ({ setPlayingTrack, savedTracks, saved, setSaved }) => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState();

  const playlistDuration = playlist?.tracks.items.reduce((total, track) => {
    return total + track?.track.duration_ms;
  }, 0);

  const getAddedDate = (track) => {
    return new Date(track?.added_at).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
  };

  const saveTrack = (e) => {
    spotifyApi.addToMySavedTracks([e.currentTarget.id]);
    setSaved(!saved);
  };

  const savedTracksIncludes = (track) => {
    return savedTracks?.map((tracks) => tracks.track.id).includes(track?.track.id);
  };

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
      <div className='playlist__tracks__container'>
        <div className='playlist__tracks-header'>
          <p>#</p>
          <p className='playlist__tracks-header-title'>Title</p>
          <p className='playlist__tracks-header-album'>Album</p>
          <p className='playlist__tracks-header-date'>Date Added</p>
          <BsClock className='playlist__tracks-clock' />
        </div>
        <div className='playlist__tracks'>
          {playlist?.tracks?.items?.map((track, index) => (
            <div className='playlist-track' onClick={() => setPlayingTrack(track?.track)}>
              <p className='playlist-trackNumber'>{index + 1}</p>
              <div className='playlist-trackTitle__container'>
                <img src={track?.track.album.images[0].url} alt='playlist-album-cover' />
                <div className='playlist-trackTitle-content'>
                  <p className='playlist-trackTitle'>{track?.track.name}</p>
                  <p className='playlist-trackArtist'>{track?.track.artists[0].name}</p>
                </div>
              </div>
              <p className='playlist-track-album'>{track?.track.album.name}</p>
              <p className='playlist-track-addedDate'>{getAddedDate(track)}</p>
              <FiHeart
                className={
                  savedTracksIncludes(track) ? 'playlist-track-saved' : 'playlist-track-saveIcon'
                }
                id={track?.track.id}
                onClick={saveTrack}
              />
              <p className='playlist-track-time'>
                {new Date(track?.track.duration_ms).toISOString().slice(14, 19)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
