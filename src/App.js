import React from "react";
import ListShelves from "./ListShelves";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelvedBooks: [],
    searchResults: []
  };

  /**
   * Get the shelved books info from the server when the BooksApp component mounts 
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ shelvedBooks: books });
    });
  }

  /**
   * Update the shelved book state when a book is placed into a different shelf 
   */
  updateBookShelf = (book, shelf) => {
    // Get the previous state and update it locally
    let books = this.state.shelvedBooks;
    books.filter(b => book.id === b.id).map(book => (book.shelf = shelf))

    // Update the server with the modified book and shelf info
    BooksAPI.update(book, shelf).then(() =>
      // Update the state using modified info
      this.setState({ shelvedBooks: books })
    );
  };

  /**
   * Update the search results state in the BooksApp component 
   */
  updateSearchResults = results => {
    this.setState({ searchResults: results });
  };

  /**
   * Get the books that match the query provided by the user from the server
   * When the query is invalid, handle the server error by returning empty result 
   */
  searchBooks = (query) => {
    BooksAPI.search(query)
      .then(results => {
        this.updateSearchResults(results);
      })
      .catch(() => {
        this.updateSearchResults([]);
      });
  };

  render() {
    /**
     * Declare the props beforehand to avoid repetitive use of this.
     */
    const shelvedBooks = this.state.shelvedBooks    
    const updateBookShelf = this.updateBookShelf
    const searchResults = this.state.searchResults
    const searchBooks = this.searchBooks

    /** 
    * Shelf information used to render books in shelves
    * width and height are the dimensions to render book thumbnails 
    */
    const shelves = [
      {
        title: "Currently Reading",
        id: "currentlyReading",
        width: 128,
        height: 193
      },
      { 
        title: "Want to Read", 
        id: "wantToRead", 
        width: 128, 
        height: 193 
      },
      { 
        title: "Read", 
        id: "read", 
        width: 128, 
        height: 192 
      },
      { 
        title: "None", 
        id: "none", 
        width: 128, 
        height: 192 }
    ]


    return (
      <div className="app">
        {
          /**
          * Create two routes - one for the main page listing the shelved books 
          * and the other for the search page
          */
        }
        <Route exact path="/"
          render={() => (
            <ListShelves
              books={shelvedBooks}
              shelves={shelves}
              updateShelf={updateBookShelf}
            />
          )}
        />
        <Route path="/search"
          render={() => (
            <SearchBooks
              books={searchResults}
              searchBooks={searchBooks}
              shelves={shelves}
              updateShelf={updateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
