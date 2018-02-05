import React from "react";
import ListShelves from "./ListShelves";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    searchResults: [],
    shelvedKeys: { 
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  /**
   * Get the shelved books info from the server when the BooksApp component mounts 
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      /**
       * Build the hashmap with shelf ids as keys and the books assigned to them as values 
       * The format is same as the one returned by the BooksAPI.udpate method
       * After the component mounts, this map is updated when there is an update to 
       * the book object using the value returned by BooksAPI.update method
       */
      let shelvedKeys = this.state.shelvedKeys
      books.map(book => shelvedKeys[book.shelf].push(book.id))
      /**
       * Set the state using books returned by BooksAPI.getAll and the previously 
       * constructed map of shelf ids and their corresponding book ids
       */
      this.setState({ shelvedBooks: books, shelvedKeys: shelvedKeys })
    })   
  }

  /**
   * Update the shelved book state when a book is placed into a different shelf 
   */
  updateBookShelf = (book, shelf) => { 
    // Update the server with the modified book and shelf info
    BooksAPI.update(book, shelf).then((data) => {          
      // Update the local state using modified info returned by the server    
      BooksAPI.getAll().then(books => {  
        this.setState({ shelvedBooks: books, shelvedKeys: data })
      })
    })
  };

  /**
   * Using the value, search for the key in the map object
   * returns key if found, otherwise returns "none"
   */
  findKeyFromValue = (object, value) => {    
    let foundKey = Object.keys(object).find(key => object[key].includes(value))
    return foundKey ? foundKey : "none"
  }

  /**
   * Update the search results state in the BooksApp component 
   */
  updateSearchResults = results => {
    const shelvedKeys = this.state.shelvedKeys
    /**
     * create the shelf property for the books in the search result using 
     * the shelvedKeys map object 
     */
    results.map(res => res.shelf = this.findKeyFromValue(shelvedKeys, res.id))
    this.setState({ searchResults: results });
  };

  /**
   * Get the books that match the query provided by the user from the server
   * When the query is invalid, handle the server error by returning empty result 
   */
  searchBooks = (query) => {
    /**
     * Udacity Review Suggestion
     * An error is displayed on the console when the user totally erases the search input term.
     * To fix it you should verify if there is a query before to make the BooksAPI.search(query)... call.
     */
    
    /**
     * Search only if the query is valid i.e not empty, handle server error by
     * setting search results state to empty array
     */
    if(query.trim()) {
      BooksAPI.search(query)
      .then(results => {
        this.updateSearchResults(results)
      }).catch(() => {
        this.updateSearchResults([])
      })
    }  
    else {
      this.updateSearchResults([])
    }
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
