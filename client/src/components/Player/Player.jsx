import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import './Player.css';

const Player = ({ accessToken, track }) => {
  const [play, setPlay] = useState(false);
  const [trackUri, setTrackUri] = useState([]);

  useEffect(() => {
    const getTrackUri = (track) => {
      if (track?.uri) setTrackUri(track?.uri);

      if (track?.length > 1) setTrackUri(track?.map((tracks) => tracks?.uri));
    };

    getTrackUri(track);
  }, [track]);

  useEffect(() => setPlay(true), [track]);

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
        uris={track ? trackUri : []}
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
