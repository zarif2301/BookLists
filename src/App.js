// App.js
// Main application component for the Book List project.
// This file controls the layout, state and communication between the components

import React from 'react';
import './App.css';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import useBookData from './hooks/useBookData';

function App() {
  const {
    books,// Array of all books
    currentPage, // Current page number
    booksPerPage, // Number of books per page
    searchTerm, // Current search term
    searchClicked, // Whether the search button was clicked
    countryFilter, // Current country filter
    languageFilter, // Current language filter
    pagesFilter, // Current pages filter
    yearFilter, // Current year filter
    uniqueCountries, // Array of unique countries
    uniqueLanguages, // Array of unique languages
    filteredBooks, // Array of filtered books
    currentBooks, // Array of current books
    setSearchTerm, // Function to update the search term
    setSearchClicked, // Function to update the search clicked state
    setCountryFilter, // Function to update the country filter
    setLanguageFilter, // Function to update the language filter
    setPagesFilter, // Function to update the pages filter
    setYearFilter, // Function to update the year filter
    setBooksPerPage, // Function to update the books per page
    setCurrentPage // Function to update the current page
  } = useBookData(); // Custom hook for managing book data

  // Updates search term as user types
  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  // Triggers search and resets to page 1
  const handleSearchClick = () => {
    setSearchClicked(true);
    setCurrentPage(1);
  };

  // Clears all filters and resets state
  const handleClearFilters = () => {
    setCountryFilter('');
    setLanguageFilter('');
    setPagesFilter('');
    setYearFilter('');
    setSearchTerm('');
    setSearchClicked(false);
    setCurrentPage(1);
  };

  // Changes the page and scrolls to top
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate total pages based on filtered books and per-page count
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="app-container">
      <Header />

      <section className="controls-container">
        <SearchBar
          searchTerm={searchTerm}
          onChange={handleSearchInputChange}
          onSearch={handleSearchClick}
          onClear={handleClearFilters}
        />

        <Filters
          countryFilter={countryFilter}
          languageFilter={languageFilter}
          pagesFilter={pagesFilter}
          yearFilter={yearFilter}
          uniqueCountries={uniqueCountries}
          uniqueLanguages={uniqueLanguages}
          booksPerPage={booksPerPage}
          onCountryChange={setCountryFilter}
          onLanguageChange={setLanguageFilter}
          onPagesChange={setPagesFilter}
          onYearChange={setYearFilter}
          onBooksPerPageChange={(val) => {
            setBooksPerPage(Number(val));
            setCurrentPage(1);
          }}
        />
      </section>

      <main className="book-list">
        <BookList books={currentBooks} />
      </main>

      <footer className="app-footer">
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageClick={handlePageClick}
          />
        )}
        <p>Page {currentPage} of {totalPages}</p>
        <p>&copy; 2025 Open Library</p>
      </footer>

      <BackToTop />
    </div>
  );
}

export default App;
