import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import './Search.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import { spotifyApi } from '../../reuseables/SpotifyApi';

const Search = ({ chooseTrack, savedTracks, setSavedTracks }) => {
  const [search, setSearch] = useState('');
  const [searchArtists, setSearchArtists] = useState();
  const [searchSongs, setSearchSongs] = useState();
  const [searchPlaylists, setSearchPlaylists] = useState();
  const [searchAlbums, setSearchAlbums] = useState();
  const [searchLoaded, setSearchLoaded] = useState(false);

  const navigate = useNavigate();

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
    spotifyApi
      .searchArtists(search, { limit: 7 })
      .then((res) => setSearchArtists(res.body.artists.items));
  }, [search]);

  useEffect(() => {
    spotifyApi
      .searchTracks(search, { limit: 4 })
      .then((res) => setSearchSongs(res.body.tracks.items));
  }, [search]);

  useEffect(() => {
    spotifyApi
      .searchPlaylists(search, { limit: 7 })
      .then((res) => setSearchPlaylists(res.body.playlists.items));
  }, [search]);

  useEffect(() => {
    spotifyApi
      .searchAlbums(search, { limit: 7 })
      .then((res) => setSearchAlbums(res.body.albums.items));
  }, [search]);

  useEffect(() => {
    if (search === '') setSearchLoaded(false);
  }, [search]);

  return (
    <div className='search__container'>
      <Searchbar search={search} setSearch={setSearch} setSearchLoaded={setSearchLoaded} />
      {searchLoaded && (
        <>
          <div className='search__topResults'>
            <div className='search__topResults-artist'>
              <h4>Top Result</h4>
              <div
                className='search__topResults-artistCard'
                onClick={() => navigate(`/artist/${searchArtists?.[0]?.id}`)}>
                <img src={searchArtists?.[0]?.images[0].url} alt='artist-profile' />
                <h1>{searchArtists?.[0]?.name}</h1>
                <button>{searchArtists?.[0]?.type}</button>
              </div>
            </div>
            <div className='search__topResults-songs'>
              <h4>Songs</h4>
              <div className='search__topResults-songsList'>
                {searchSongs?.map((song) => (
                  <div className='search__topResults-songCard'>
                    <img
                      src={song?.album.images[0].url}
                      alt='album-cover'
                      onClick={() => chooseTrack(song)}
                    />
                    <div className='search__topResults-songCard__content'>
                      <h5 onClick={() => chooseTrack(song)}>{song?.name}</h5>
                      <p onClick={() => navigate(`/artist/${song?.artists[0].id}`)}>
                        {song?.artists[0].name}
                      </p>
                    </div>
                    <FiHeart
                      className={
                        savedTracksIncludes(song.id) ? 'search-song-saved' : 'search-song-saveIcon'
                      }
                      id={song.id}
                      onClick={saveTrack}
                    />
                    <p className='search__topResults-songCard-trackTime'>
                      {new Date(song?.duration_ms).toISOString().slice(14, 19)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='search-artists__container'>
            <h2>Artists</h2>
            <div className='search-artists'>
              {searchArtists?.map((artist) => (
                <ArtistCard artist={artist} />
              ))}
            </div>
          </div>
          <div className='search-albums__container'>
            <h2>Albums</h2>
            <div className='search-albums'>
              {searchAlbums?.map((album) => (
                <AlbumCard album={album} />
              ))}
            </div>
          </div>
          <div className='search-playlists__container'>
            <h2>Playlists</h2>
            <div className='search-playlists'>
              {searchPlaylists?.map((playlist) => (
                <PlaylistCard playlist={playlist} chooseTrack={chooseTrack} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
