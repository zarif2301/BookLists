// App.js
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
    books,
    currentPage,
    booksPerPage,
    searchTerm,
    searchClicked,
    countryFilter,
    languageFilter,
    pagesFilter,
    yearFilter,
    uniqueCountries,
    uniqueLanguages,
    filteredBooks,
    currentBooks,
    setSearchTerm,
    setSearchClicked,
    setCountryFilter,
    setLanguageFilter,
    setPagesFilter,
    setYearFilter,
    setBooksPerPage,
    setCurrentPage
  } = useBookData();

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);
  const handleSearchClick = () => {
    setSearchClicked(true);
    setCurrentPage(1);
  };
  const handleClearFilters = () => {
    setCountryFilter('');
    setLanguageFilter('');
    setPagesFilter('');
    setYearFilter('');
    setSearchTerm('');
    setSearchClicked(false);
    setCurrentPage(1);
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
