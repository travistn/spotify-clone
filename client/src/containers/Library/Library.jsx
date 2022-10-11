import React from 'react';

import './Library.css';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';

const Library = ({ userPlaylists }) => {
  return (
    <div className='library__container'>
      <PageNavigation />
      <h3>Playlists</h3>
      <div className='library-playlists'>
        {userPlaylists?.items?.map((playlist) => (
          <PlaylistCard playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Library;
