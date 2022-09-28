import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsClock, BsPlayFill } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';

import './Album.css';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import { convertMilliseconds } from '../../reuseables/ConvertMilliseconds';
import PageNavigation from '../../components/PageNavigation/PageNavigation';

const Album = ({ savedTracks, setSavedTracks, chooseTrack }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState();
  const [artistImage, setArtistImage] = useState();

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  const releaseDate = new Date(album?.release_date).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });

  const albumDuration = album?.tracks.items.reduce((total, track) => {
    return total + track?.duration_ms;
  }, 0);

  const savedTracksIncludes = (trackId) => {
    return savedTracks?.some((tracks) => tracks.track.id === trackId);
  };

  const saveTrack = (e) => {
    if (!savedTracksIncludes(e.currentTarget.id)) {
      spotifyApi
        .addToMySavedTracks([e.currentTarget.id])
        .then(spotifyApi.getMySavedTracks().then((res) => setSavedTracks(res.body.items)));
    }
    if (savedTracksIncludes(e.currentTarget.id)) {
      spotifyApi.removeFromMySavedTracks([e.currentTarget.id]);
      setSavedTracks(savedTracks.filter((track) => track?.track.id !== e.currentTarget.id));
    }
  };

  useEffect(() => {
    spotifyApi.getAlbum(id).then((res) => setAlbum(res.body));
  }, [id]);

  useEffect(() => {
    spotifyApi
      .getArtist(album?.artists[0].id)
      .then((res) => setArtistImage(res.body.images[0].url));
  }, [album?.artists]);

  return (
    <div className='album__container'>
      <PageNavigation />
      <div className='album__header'>
        <img src={album?.images[0].url} alt='album-cover' className='album-image' />
        <div className='album__header-details'>
          <h5>{album?.album_type}</h5>
          <h3>{album?.name}</h3>
          <span>
            <img src={artistImage} alt='artist' className='album-artistImage' />
            {album?.artists.map((artist) => (
              <p
                className='album__header-artistName'
                onClick={() => navigate(`/artist/${artist?.id}`)}>
                {artist?.name}
              </p>
            ))}
            {`• ${album?.release_date.substring(0, 4)} • ${
              album?.total_tracks
            } song(s) • ${convertMilliseconds(albumDuration)}`}
          </span>
        </div>
      </div>
      <div className='album-play__container'>
        <button className='album-playButton' onClick={() => chooseTrack(album)}>
          <BsPlayFill size='32' />
        </button>
      </div>
      <div className='album__tracks'>
        <div className='album__tracks-header'>
          <p>#</p>
          <p>Title</p>
          <BsClock className='album__tracks-clock' />
        </div>
        {album?.tracks.items.map((trackList) => (
          <div className='album__tracks-list'>
            <p className='album-trackNumber'>{trackList?.track_number}</p>
            <div className='album__tracks-info'>
              <h4 className='album-trackName' onClick={() => handlePlay(trackList)}>
                {trackList?.name}
              </h4>
              <div className='album_trackArtists'>
                {trackList?.artists.map((artist) => (
                  <p
                    className='album-trackArtist'
                    key={artist?.id}
                    onClick={() => navigate(`/artist/${artist?.id}`)}>
                    {artist?.name}
                  </p>
                ))}
              </div>
            </div>
            <div className='album__tracks-right'>
              <FiHeart
                className={
                  savedTracksIncludes(trackList?.id) ? 'album-track-saved' : 'album-track-saveIcon'
                }
                id={trackList?.id}
                onClick={saveTrack}
              />
              <p className='album-trackTime'>
                {new Date(trackList?.duration_ms).toISOString().slice(14, 19)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='album__footer'>
        <p className='album-releaseDate'>{releaseDate}</p>
        {album?.copyrights.map((copyright) => (
          <p className='album-copyright'>{copyright?.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Album;
