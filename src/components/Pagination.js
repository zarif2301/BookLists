import React from 'react';

//Renders a set of pagination buttons allowing users to navigate between pages.
export default function Pagination({ totalPages, currentPage, onPageClick }) {
  return (
    <nav className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageClick(page)}
          className={page === currentPage ? 'page-btn active' : 'page-btn'}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
