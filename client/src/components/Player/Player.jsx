import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import './Player.css';

const Player = ({ accessToken, track }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [track?.uri]);

  if (!accessToken) return null;
  return (
    <div className='player'>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={track?.uri ? [track?.uri] : []}
        styles={{
          bgColor: '#181818',
          color: 'white',
          trackArtistColor: 'gray',
          trackNameColor: 'white',
          sliderColor: 'white',
          sliderHandleColor: 'white',
          sliderTrackColor: 'gray',
          activeColor: '#00d76b',
          height: '100px',
        }}
        initialVolume={100}
      />
    </div>
  );
};

export default Player;
