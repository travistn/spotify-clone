import React from 'react';

import './TrackSearchResults.css';

const TrackSearchResults = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div className='track' onClick={handlePlay}>
      <img src={track.albumUrl} alt='album-art' />
      <div className='track-details'>
        <h4>{track.title}</h4>
        <h5>{track.artist}</h5>
      </div>
    </div>
  );
};

export default TrackSearchResults;
