import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

const filterByRange = (value, [min, max]) => value >= min && value <= max;
const getCenturyRange = (label) => {
  switch (label) {
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

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const [countryFilter, setCountryFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [pagesFilter, setPagesFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(setBooks);
  }, []);

  const uniqueCountries = useMemo(
    () => [...new Set(books.map(book => book.country))].sort(),
    [books]
  );

  const uniqueLanguages = useMemo(
    () => [...new Set(books.map(book => book.language))].sort(),
    [books]
  );

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      !searchClicked ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = !countryFilter || book.country === countryFilter;
    const matchesLanguage = !languageFilter || book.language === languageFilter;

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

  return (
    <div className="app-container">
      {/* Hero Header */}
      <header className="hero-header">
        <h1>Welcome to Open Library</h1>
        <p>Explore 100 of the best books from around the world</p>
      </header>

      {/* Controls */}
      <section className="controls-container">
        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={e => e.key === 'Enter' && handleSearchClick()}
          />
          <button onClick={handleSearchClick} className="btn btn-primary">
            Search
          </button>
          <button onClick={handleClearFilters} className="btn btn-secondary clear-btn">
            Clear Filters
          </button>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
            <option value="">All Countries</option>
            {uniqueCountries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={languageFilter} onChange={e => setLanguageFilter(e.target.value)}>
            <option value="">All Languages</option>
            {uniqueLanguages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select value={pagesFilter} onChange={e => setPagesFilter(e.target.value)}>
            <option value="">All Page Ranges</option>
            <option value="1-100">1 - 100</option>
            <option value="101-200">101 - 200</option>
            <option value="201-300">201 - 300</option>
          </select>
          <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
            <option value="">All Centuries</option>
            <option value="16th">16th Century</option>
            <option value="17th">17th Century</option>
            <option value="18th">18th Century</option>
            <option value="19th">19th Century</option>
          </select>
        </div>
        {/* Books per page selector separate */}
<div className="books-per-page-container">
  <label htmlFor="booksPerPageSelect" className="books-per-page-label">
    Show books per page:
  </label>
  <select
    id="booksPerPageSelect"
    value={booksPerPage}
    onChange={e => {
      setBooksPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    className="books-per-page-select"
  >
    <option value={20}>20</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select>
</div>
      </section>

      {/* Books Grid */}
      <main className="book-list">
        {currentBooks.length === 0 ? (
          <p className="no-results">No books found.</p>
        ) : (
          currentBooks.map((book, idx) => (
            <article key={idx} className="book-card">
              <img
                className="book-image"
                src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
                alt={book.title}
              />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><b>Author:</b> {book.author}</p>
                <p><b>Country:</b> {book.country}</p>
                <p><b>Year:</b> {book.year}</p>
                <p><b>Pages:</b> {book.pages}</p>
              </div>
            </article>
          ))
        )}
      </main>

      {/* Pagination */}
      <footer className="app-footer">
        {totalPages > 1 && (
          <nav className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={page === currentPage ? 'page-btn active' : 'page-btn'}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </nav>
        )}
        <p>Page {currentPage} of {totalPages}</p>
        <p>&copy; 2025 Open Library</p>
      </footer>

      <BackToTop />
    </div>
  );
}

export default App;
