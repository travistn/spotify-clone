import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import './Artist.css';
import { spotifyApi } from '../../reuseables/SpotifyApi';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import AlbumCard from '../../components/AlbumCard/AlbumCard';

const Artist = ({ setPlayingTrack, savedTracks, setSavedTracks }) => {
  const [artist, setArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const [artistTopTracks, setartistTopTracks] = useState();
  const [relatedArtists, setRelatedArtists] = useState();

  const [showMore, setShowMore] = useState(false);
  const [discographySelector, setDiscographySelector] = useState('album');
  const { id } = useParams();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

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
    spotifyApi.getArtist(id).then((res) => setArtist(res.body));
  }, [id]);

  useEffect(() => {
    spotifyApi
      .getArtistAlbums(id, {
        limit: 7,
        include_groups: discographySelector === 'album' ? 'album' : 'single',
      })
      .then((res) => setArtistAlbums(res.body.items));
  }, [id, discographySelector]);

  useEffect(() => {
    spotifyApi.getArtistTopTracks(id, 'US').then((res) => setartistTopTracks(res.body.tracks));
  }, [id]);

  useEffect(() => {
    spotifyApi
      .getArtistRelatedArtists(id)
      .then((res) => setRelatedArtists(res.body.artists.slice(0, 7)));
  }, [id]);

  return (
    <div className='artist__container'>
      <div className='artist__header' style={{ backgroundImage: `url(${artist?.images[0].url})` }}>
        <PageNavigation />
        <h2>{artist?.name}</h2>
        <h5>{artist?.followers.total.toLocaleString()} followers</h5>
      </div>
      <div className='artist-topTracks__container'>
        <h4>Popular</h4>
        <ol className='artist__topTracks'>
          {(showMore ? artistTopTracks : artistTopTracks?.slice(0, 5))?.map((track) => (
            <li className='artist-topTrack' key={track?.id}>
              <img
                src={track?.album.images[0].url}
                alt='album'
                onClick={() => setPlayingTrack(track)}
              />
              <p className='artist-topTrackName' onClick={() => setPlayingTrack(track)}>
                {track?.name}
              </p>
              <FiHeart
                className={
                  savedTracksIncludes(track?.id)
                    ? 'artist-topTrack-saved'
                    : 'artist-topTrack-saveIcon'
                }
                id={track?.id}
                onClick={saveTrack}
              />
              <p className='artist-topTrackTime'>
                {new Date(track?.duration_ms).toISOString().slice(14, 19)}
              </p>
            </li>
          ))}
          <p className='artist__topTracks-showMore' onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'See More'}
          </p>
        </ol>
      </div>
      <div className='artist-discography__container'>
        <h4 className='artist-discography-header'>Discography</h4>
        <div className='artist-discography-selector'>
          <div
            className={`artist-discography-album-selector ${
              discographySelector === 'album' ? 'artist-discography-selected' : ''
            }`}
            onClick={() => setDiscographySelector('album')}>
            Albums
          </div>
          <div
            className={`artist-discography-single-selector ${
              discographySelector === 'single' ? 'artist-discography-selected' : ''
            }`}
            onClick={() => setDiscographySelector('single')}>
            Singles and EPs
          </div>
        </div>
        <div className='artist-discography'>
          {artistAlbums?.map((album) => (
            <AlbumCard album={album} chooseTrack={chooseTrack} />
          ))}
        </div>
      </div>
      <div className='artist-relatedArtists__container'>
        <h4 className='artist-relatedArtists-header'>Related Artists</h4>
        <div className='artist-relatedArtists'>
          {relatedArtists?.map((artist) => (
            <ArtistCard artist={artist} key={artist?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
