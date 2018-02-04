import React, { Component } from "react"
import { Link } from "react-router-dom"
import ListBooks from "./ListBooks"

class SearchBooks extends Component {
  render() {    
    /**
     * Declare the props beforehand to avoid repetitive use of this.
     */    
    const { books, shelves, updateShelf, searchBooks} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {
            /**
             * Clear the search results when the user navigates to the main page
             */
          }
          <Link className="close-search" to="/" onClick={() => searchBooks('')}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onInput={(e) => searchBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks 
            books={books} 
            updateShelf={updateShelf} 
            shelf={shelves.filter(s => s.id === "none")} 
            shelves={shelves} />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
