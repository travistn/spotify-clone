import React from 'react';

import './Home.css';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import TopArtistCard from '../../components/TopArtistCard/TopArtistCard';
import PageNavigation from '../../components/PageNavigation/PageNavigation';

const Home = ({ recentlyPlayedTracks, newReleases, myTopArtists, setPlayingTrack }) => {
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <div className='home__container'>
      <PageNavigation />
      <div className='home-header'>
        <h2>Good afternoon</h2>
      </div>
      <div className='home-newReleases__container'>
        <h3>Fresh new music</h3>
        <div className='home-newReleases'>
          {newReleases?.map((track) => (
            <AlbumCard track={track} key={track?.id} chooseTrack={chooseTrack} />
          ))}
        </div>
      </div>
      <div className='home-topArtist__container'>
        <h3>Your favorite artists</h3>
        <div className='home-topArtist'>
          {myTopArtists?.map((artist) => (
            <TopArtistCard artist={artist} key={artist?.id} />
          ))}
        </div>
      </div>
      <div className='home-recentlyPlayed__container'>
        <h3>Recently played</h3>
        <div className='home-recentlyPlayed'>
          {recentlyPlayedTracks?.map((recentTrack) => (
            <AlbumCard
              recentTrack={recentTrack?.track}
              key={recentTrack?.id}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
