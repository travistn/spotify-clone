import React from 'react';
import { FiSearch } from 'react-icons/fi';

import './Searchbar.css';

const Searchbar = ({ search, setSearch }) => {
  return (
    <form className='searchBar'>
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
