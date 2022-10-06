import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Search.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import { spotifyApi } from '../../reuseables/SpotifyApi';

const Search = ({ chooseTrack }) => {
  const [search, setSearch] = useState('');
  const [searchArtist, setSearchArtist] = useState();
  const [searchSongs, setSearchSongs] = useState();
  const [searchLoaded, setSearchLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi
      .searchArtists(search, { limit: 1 })
      .then((res) => setSearchArtist(res.body.artists.items[0]));
  }, [search]);

  useEffect(() => {
    spotifyApi
      .searchTracks(search, { limit: 4 })
      .then((res) => setSearchSongs(res.body.tracks.items));
  }, [search]);

  return (
    <div className='search__container'>
      <Searchbar search={search} setSearch={setSearch} setSearchLoaded={setSearchLoaded} />
      {searchLoaded && (
        <div className='search__topResults'>
          <div className='search__topResults-artist'>
            <h4>Top Result</h4>
            <div
              className='search__topResults-artistCard'
              onClick={() => navigate(`/artist/${searchArtist?.id}`)}>
              <img src={searchArtist?.images[0].url} alt='artist-profile' />
              <h1>{searchArtist?.name}</h1>
              <button>{searchArtist?.type}</button>
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
                  <p className='search__topResults-songCard-trackTime'>
                    {new Date(song?.duration_ms).toISOString().slice(14, 19)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
