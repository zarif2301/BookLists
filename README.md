# Book Finder Web App

A React-based web application that allows users to **search**, **filter**, and **paginate** through a dataset of the 100 best books.  
Users can filter books by **country**, **language**, **page range**, and **century of publication**, and can also adjust the number of books displayed per page.

## 🚀 Features

- **Search by Title or Author**  
  Quickly find books by entering keywords in the search bar.

- **Multiple Filters**

  - Country
  - Language
  - Page Range
  - Publication Century

- **Pagination**  
  Navigate between pages of results.

- **Adjustable Results Per Page**  
  Choose how many books to show on a page (20, 50, or 100).

## 📖 How It Works

1. **Data Loading**

   - The app fetches the `books.json` file on load.
   - The `useBookData` hook stores the books in state.

2. **Filtering**

   - Users can filter books by country, language, page range, or publication century.
   - The filters are applied in combination with search.

3. **Searching**

   - The search bar matches keywords in **title** or **author**.
   - Pressing Enter or clicking Search applies the filter.

4. **Pagination**

   - Results are paginated based on the selected books-per-page value.
   - The active page is highlighted.

5. **Responsive Rendering**
   - If no books match, the UI shows a `"No books found"` message.
