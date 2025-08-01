import React from 'react';

export default function Filters({
  countryFilter,
  languageFilter,
  pagesFilter,
  yearFilter,
  uniqueCountries,
  uniqueLanguages,
  booksPerPage,
  onCountryChange,
  onLanguageChange,
  onPagesChange,
  onYearChange,
  onBooksPerPageChange
}) {
  return (
    <>
      <div className="filters-container">
        <select value={countryFilter} onChange={e => onCountryChange(e.target.value)}>
          <option value="">All Countries</option>
          {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={languageFilter} onChange={e => onLanguageChange(e.target.value)}>
          <option value="">All Languages</option>
          {uniqueLanguages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select value={pagesFilter} onChange={e => onPagesChange(e.target.value)}>
          <option value="">All Page Ranges</option>
          <option value="1-100">1 - 100</option>
          <option value="101-200">101 - 200</option>
          <option value="201-300">201 - 300</option>
        </select>

        <select value={yearFilter} onChange={e => onYearChange(e.target.value)}>
          <option value="">All Centuries</option>
          <option value="16th">16th Century</option>
          <option value="17th">17th Century</option>
          <option value="18th">18th Century</option>
          <option value="19th">19th Century</option>
        </select>
      </div>

      <div className="books-per-page-container">
        <label htmlFor="booksPerPageSelect" className="books-per-page-label">
          Show books per page:
        </label>
        <select
          id="booksPerPageSelect"
          value={booksPerPage}
          onChange={e => onBooksPerPageChange(e.target.value)}
          className="books-per-page-select"
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </>
  );
}
