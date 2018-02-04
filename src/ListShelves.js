import React, { Component } from "react"
import { Link } from "react-router-dom"
import ListBooks from "./ListBooks";

class ListShelves extends Component {
  render() {
    /**
     * Declare the props beforehand to avoid repetitive use of this.
     */
    const { books, shelves, updateShelf } = this.props

    /**
     * Filter the shelves that are not displayed - the shelf with "none" in this case
     * is filtered out and only "currentlyReading", "wantToRead" and "Read" are selected
     */
    const showingShelves = shelves.filter(shelf => shelf.id !== "none")
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              /**
               * Loop through the shelves and display the books in them 
               */
            }
            {showingShelves.map(shelf => (
              <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  {
                    /**
                     * Fitler the books for the corresponding shelf and send as props to ListBooks component
                     */
                  }
                  <ListBooks 
                    books={books.filter(book => book.shelf === shelf.id)} 
                    updateShelf={updateShelf} 
                    shelf={shelf} 
                    shelves={shelves} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    );
  }
}

export default ListShelves
