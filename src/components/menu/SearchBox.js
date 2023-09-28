import React, { useState } from 'react';

function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  return (
    <input
      type="text"
      placeholder="Pesquisar"
      value={searchTerm}
      onChange={handleChange}
      className="search-box"
    />
  );
}

export default SearchBox;
