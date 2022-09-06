import React from 'react';

import './Searchbar.css';
import PageNavigation from '../PageNavigation/PageNavigation';

const Searchbar = ({ search, setSearch }) => {
  return (
    <form className='searchBar'>
      <PageNavigation />
      <input
        type='search'
        placeholder='Search for songs or artists'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Searchbar;
