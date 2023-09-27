import React from 'react';

function SearchBox({ onSearch }) {
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Pesquisar"
      onChange={handleChange}
      className="search-box"
    />
  );
}

export default SearchBox;
