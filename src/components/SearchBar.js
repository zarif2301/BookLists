import React from 'react';
//Renders a search input with "Search" and "Clear Filters" buttons.
export default function SearchBar({ searchTerm, onChange, onSearch, onClear }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={onChange}
        onKeyDown={e => e.key === 'Enter' && onSearch()}
      />
      <button onClick={onSearch} className="btn btn-primary">Search</button>
      <button onClick={onClear} className="btn btn-secondary clear-btn">Clear Filters</button>
    </div>
  );
}
