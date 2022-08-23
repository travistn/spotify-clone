import { useState, useEffect, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { AppContext } from '../../contexts/AppContext';

import './Player.css';

const Player = ({ accessToken, track }) => {
  const [play, setPlay] = useState(false);
  const { playingTrack } = useContext(AppContext);

  console.log(playingTrack);

  useEffect(() => setPlay(true), [playingTrack?.uri]);

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
        uris={playingTrack?.uri ? [playingTrack?.uri] : []}
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
