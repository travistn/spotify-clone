import React from 'react';

import './Search.css';

const Search = ({ search, setSearch }) => {
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

export default Search;
