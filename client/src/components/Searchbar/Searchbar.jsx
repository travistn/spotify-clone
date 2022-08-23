import React from 'react';

import './Searchbar.css';

const Searchbar = ({ search, setSearch }) => {
  return (
    <form className='search__container'>
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
