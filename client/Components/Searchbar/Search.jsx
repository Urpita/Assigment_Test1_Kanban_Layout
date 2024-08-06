import React from 'react';
import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='input-wrapper'>
      <FaSearch id='search-icon' />
      <input 
        placeholder='Type to search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
