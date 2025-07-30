import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  // Filter states
  const [countryFilter, setCountryFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [pagesFilter, setPagesFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const booksPerPage = 20;

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

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

  const filterByRange = (value, range) => {
    const [min, max] = range;
    return value >= min && value <= max;
  };

  const getCenturyRange = (centuryLabel) => {
    switch (centuryLabel) {
      case '16th': return [1501, 1600];
      case '17th': return [1601, 1700];
      case '18th': return [1701, 1800];
      case '19th': return [1801, 1900];
      default: return null;
    }
  };

  const getPageRange = (label) => {
    switch (label) {
      case '1-100': return [1, 100];
      case '101-200': return [101, 200];
      case '201-300': return [201, 300];
      default: return null;
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = !searchClicked || (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesCountry = countryFilter === '' || book.country === countryFilter;
    const matchesLanguage = languageFilter === '' || book.language === languageFilter;

    const pagesRange = getPageRange(pagesFilter);
    const matchesPages = !pagesRange || filterByRange(book.pages, pagesRange);

    const yearRange = getCenturyRange(yearFilter);
    const matchesYear = !yearRange || filterByRange(book.year, yearRange);

    return matchesSearch && matchesCountry && matchesLanguage && matchesPages && matchesYear;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uniqueCountries = [...new Set(books.map((book) => book.country))].sort();
  const uniqueLanguages = [...new Set(books.map((book) => book.language))].sort();

  return (
    <div className="app-container">
      <Header />

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearchClick} className="search-button">Search</button>
      </div>

      {/* Filters */}
      <div className="filter-container">
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
          <option value="">All Countries</option>
          {uniqueCountries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>

        <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
          <option value="">All Languages</option>
          {uniqueLanguages.map((lang, index) => (
            <option key={index} value={lang}>{lang}</option>
          ))}
        </select>

        <select value={pagesFilter} onChange={(e) => setPagesFilter(e.target.value)}>
          <option value="">All Page Ranges</option>
          <option value="1-100">1-100</option>
          <option value="101-200">101-200</option>
          <option value="201-300">201-300</option>
        </select>

        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="">All Centuries</option>
          <option value="16th">16th Century</option>
          <option value="17th">17th Century</option>
          <option value="18th">18th Century</option>
          <option value="19th">19th Century</option>
        </select>

        <button onClick={handleClearFilters} className="clear-button">Clear Filters</button>
      </div>

      {/* Book list */}
      <main className="book-list">
        {currentBooks.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No books found.</p>
        ) : (
          currentBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img
                src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Country:</strong> {book.country}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>Pages:</strong> {book.pages}</p>
            </div>
          ))
        )}
      </main>

      {/* Pagination */}
      <footer className="app-footer">
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageClick(num)}
                className={num === currentPage ? 'active' : ''}
              >
                {num}
              </button>
            ))}
          </div>
        )}

        <p style={{ marginTop: '10px' }}>
          Page {currentPage} of {totalPages}
        </p>
        <p>&copy; 2025 Book List</p>
      </footer>
    </div>
  );
}

export default App;
