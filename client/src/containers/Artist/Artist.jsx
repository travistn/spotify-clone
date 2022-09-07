import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { spotifyApi } from '../../reuseables/SpotifyApi';

import './Artist.css';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import AlbumCard from '../../components/AlbumCard/AlbumCard';

const Artist = ({ setPlayingTrack }) => {
  const [artist, setArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const [artistTopTracks, setartistTopTracks] = useState();
  const [relatedArtists, setRelatedArtists] = useState();

  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    spotifyApi.getArtist(id).then((res) => setArtist(res.body));
  }, [id]);

  useEffect(() => {
    spotifyApi.getArtistAlbums(id, { limit: 7 }).then((res) => setArtistAlbums(res.body.items));
  }, [id]);

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
            <li className='artist-topTrack' onClick={() => setPlayingTrack(track)}>
              <img src={track?.album.images[0].url} alt='album' />
              <p className='artist-topTrackName'>{track?.name}</p>
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
            <ArtistCard artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
