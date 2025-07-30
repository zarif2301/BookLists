import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Filters
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedPages, setSelectedPages] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const booksPerPage = 20;

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Handle actual search button click
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchInput('');
    setSelectedCountry('');
    setSelectedLanguage('');
    setSelectedPages('');
    setSelectedYear('');
    setCurrentPage(1);
  };

  // Apply filters
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry ? book.country === selectedCountry : true;
    const matchesLanguage = selectedLanguage ? book.language === selectedLanguage : true;
    const matchesPages =
      selectedPages === 'lt200' ? book.pages < 200 :
      selectedPages === '200to500' ? book.pages >= 200 && book.pages <= 500 :
      selectedPages === 'gt500' ? book.pages > 500 : true;
    const matchesYear = selectedYear ? book.year.toString() === selectedYear : true;

    return matchesSearch && matchesCountry && matchesLanguage && matchesPages && matchesYear;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="app-container">
      <Header />

      {/* Search & Filters */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-container">
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">All Countries</option>
          {[...new Set(books.map(book => book.country))].sort().map((country, idx) => (
            <option key={idx} value={country}>{country}</option>
          ))}
        </select>

        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="">All Languages</option>
          {[...new Set(books.map(book => book.language))].sort().map((lang, idx) => (
            <option key={idx} value={lang}>{lang}</option>
          ))}
        </select>

        <select value={selectedPages} onChange={(e) => setSelectedPages(e.target.value)}>
          <option value="">All Page Counts</option>
          <option value="lt200">Less than 200</option>
          <option value="200to500">200–500</option>
          <option value="gt500">More than 500</option>
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">All Years</option>
          {[...new Set(books.map(book => book.year))].sort((a, b) => a - b).map((year, idx) => (
            <option key={idx} value={year}>{year}</option>
          ))}
        </select>

        <button className="clear-button" onClick={handleClearFilters}>Clear Filters</button>
      </div>

      {/* Book list */}
      <main className="book-list">
        {currentBooks.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            No books found.
          </p>
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
              <p><strong>Language:</strong> {book.language}</p>
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
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => handlePageClick(num)}
                className={num === currentPage ? 'active' : ''}
                aria-current={num === currentPage ? 'page' : undefined}
              >
                {num}
              </button>
            ))}
          </div>
        )}

        <p style={{ marginTop: '10px' }}>
          Page {currentPage} of {totalPages}
        </p>
        <p>&copy; 2025 Book List | Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
