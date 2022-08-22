import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import './Dashboard.css';
import Search from '../../components/Search/Search';
import TrackSearchResults from '../../components/TrackSearchResults/TrackSearchResults';
import Player from '../../components/Player/Player';
import useAuth from '../../hooks/useAuth';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
  };

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

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
  }, [search, accessToken]);

  return (
    <>
      <div className='dashboard__container'>
        <Search search={search} setSearch={setSearch} />
        <div className='dashboard-searchResults'>
          {searchResults.map((track) => (
            <TrackSearchResults track={track} key={track.uri} chooseTrack={chooseTrack} />
          ))}
        </div>
      </div>
      <Player accessToken={accessToken} track={playingTrack} spotifyApi={spotifyApi} />
    </>
  );
};

export default Dashboard;
