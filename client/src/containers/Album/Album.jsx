import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsClock } from 'react-icons/bs';

import './Album.css';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import { convertMilliseconds } from '../../reuseables/ConvertMilliseconds';
import PageNavigation from '../../components/PageNavigation/PageNavigation';

const Album = ({ setPlayingTrack }) => {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [artistImage, setArtistImage] = useState();

  const releaseDate = new Date(album?.release_date).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });

  const albumDuration = album?.tracks.items.reduce((total, track) => {
    return total + track?.duration_ms;
  }, 0);

  useEffect(() => {
    spotifyApi.getAlbum(id).then((res) => setAlbum(res.body));
  }, [id]);

  useEffect(() => {
    spotifyApi
      .getArtist(album?.artists[0].id)
      .then((res) => setArtistImage(res.body.images[0].url));
  });

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
            {`${album?.artists
              .map((artist) => artist.name)
              .join(' • ')} • ${album?.release_date.substring(0, 4)} • ${
              album?.total_tracks
            } song(s), • ${convertMilliseconds(albumDuration)} `}
          </span>
        </div>
      </div>
      <div className='album__tracks'>
        <div className='album__tracks-header'>
          <p>#</p>
          <p>Title</p>
          <BsClock className='album__tracks-clock' />
        </div>
        {album?.tracks.items.map((trackList) => (
          <div className='album__tracks-list' onClick={() => setPlayingTrack(trackList)}>
            <p className='album-trackNumber'>{trackList?.track_number}</p>
            <div className='album__tracks-info'>
              <h4 className='album-trackName'>{trackList?.name}</h4>
              <h5 className='album-trackArtist'>
                {trackList?.artists.map((artist) => artist?.name).join(', ')}
              </h5>
            </div>
            <p className='album_trackTime'>
              {new Date(trackList?.duration_ms).toISOString().slice(14, 19)}
            </p>
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
