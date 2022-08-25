import React, { useState, useEffect } from 'react';

import './Search.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import TrackSearchResults from '../../components/TrackSearchResults/TrackSearchResults';
import { spotifyApi } from '../../reuseables/SpotifyApi';

const Search = ({ setPlayingTrack }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;

      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search]);

  return (
    <div className='search__container'>
      <div className='searchBar__container'>
        <Searchbar search={search} setSearch={setSearch} />
      </div>
      <div className='search-results'>
        {searchResults.map((track) => (
          <TrackSearchResults track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}
      </div>
    </div>
  );
};

export default Search;
