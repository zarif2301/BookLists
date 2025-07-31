import React from 'react';

export default function BookList({ books }) {
  if (books.length === 0) {
    return <p className="no-results">No books found.</p>;
  }

  return books.map((book, idx) => (
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
  ));
}
