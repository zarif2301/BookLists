import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 20;

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Filter books by title or author
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Reset to page 1 when search changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="app-container">
      <Header />

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

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
