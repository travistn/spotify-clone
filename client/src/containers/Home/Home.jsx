import React from 'react';

import './Home.css';
import AlbumCard from '../../components/AlbumCard/AlbumCard';

const Home = ({ recentlyPlayedTracks, newReleases }) => {
  return (
    <div className='home__container'>
      <div className='home-header'>
        <h2>Good afternoon</h2>
      </div>
      <div className='home-newReleases__container'>
        <h3>Fresh New Music</h3>
        <div className='home-newReleases'>
          {newReleases?.map((track) => (
            <AlbumCard track={track} key={track?.id} />
          ))}
        </div>
      </div>
      <div className='home-recentlyPlayed__container'>
        <h3>Recently Played</h3>
        <div className='home-recentlyPlayed'>
          {recentlyPlayedTracks?.map((recentTrack) => (
            <AlbumCard recentTrack={recentTrack?.track} key={recentTrack?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
