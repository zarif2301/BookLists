import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    language: '',
    pages: '',
    year: ''
  });
  const booksPerPage = 20;

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Get filter options from books
  const uniqueOptions = (key) => [...new Set(books.map((book) => book[key]))].sort();

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  // Apply filters and search
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.country === '' || book.country === filters.country) &&
      (filters.language === '' || book.language === filters.language) &&
      (filters.pages === '' || book.pages === parseInt(filters.pages)) &&
      (filters.year === '' || book.year === parseInt(filters.year));

    return matchesSearch && matchesFilters;
  });

  // Pagination
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

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="filter-container">
        <select name="country" value={filters.country} onChange={handleFilterChange}>
          <option value="">All Countries</option>
          {uniqueOptions('country').map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <select name="language" value={filters.language} onChange={handleFilterChange}>
          <option value="">All Languages</option>
          {uniqueOptions('language').map((l, i) => (
            <option key={i} value={l}>{l}</option>
          ))}
        </select>

        <select name="pages" value={filters.pages} onChange={handleFilterChange}>
          <option value="">All Page Counts</option>
          {uniqueOptions('pages').map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>

        <select name="year" value={filters.year} onChange={handleFilterChange}>
          <option value="">All Years</option>
          {uniqueOptions('year').map((y, i) => (
            <option key={i} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Book List */}
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
