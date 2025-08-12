import React from 'react';

// This component is for rendering a list of book cards.
// Each card displays the book's image, title, author, country, year, and number of pages.

export default function BookList({ books }) {

  // If no books match the search/filter criteria, show a "No books found" message.
  if (books.length === 0) {
    return <p className="no-results">No books found.</p>;
  }

  // Map over the list of books and render a card for each one
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
