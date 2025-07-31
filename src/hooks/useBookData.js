import { useState, useEffect, useMemo } from 'react';

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

export default function useBookData() {
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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return {
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
  };
}
