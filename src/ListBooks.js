import React, { Component } from "react"

class ListBooks extends Component {
  render() {
    const books = this.props.books;
    const updateShelf = this.props.updateShelf;
    const shelf = this.props.shelf;
    const shelves = this.props.shelves;
    return (
      /**
       * Loop through the books array and display on the page
       * When the shelf is changed for a book, it is passed on to BooksApp
       * via updateShelf props
       */        
        <ol className="books-grid">
          {books && books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  {
                    /**
                     * Default height and width values are used when there is no shelf 
                     * info - i.e. when the ListBooks is called from SearchBooks component
                     */
                  }

                  {
                    /**
                     * Udacity Review Suggestion
                     * Books missing imageLinks/thumbnail are not displayed on the search page. 
                     * For that, you can update your code adding a condition to render thumbnails only if the book has an imageLinks property. 
                     * You can also use a default cover image in case the book does not have one. Here is a URL you can use for the default cover image: 
                     * http://via.placeholder.com/128x193?text=No%20Cover (you can change the image size and text in the URL).
                     * Like this:
                     * backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail?`${book.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})`
                     */
                  }
                  <div className="book-cover"                    
                    style={{
                      width: shelf.width || 128,
                      height: shelf.height || 192,
                      backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail?`${book.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})`
                    }}
                  />
                  <div className="book-shelf-changer">
                  {
                    /**
                     * The shelf selection options are rendered using shelves props 
                     * The default selection is none when there is no shelf info on
                     * the book object
                     */
                  }
                    <select
                      value={book.shelf}
                      onChange={e => updateShelf(book, e.target.value)}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      {shelves.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {
                    /**
                     * Udacity Review Suggestion
                     * You can use a conditional rendering to separate author names with a comma
                     */
                  }
                  {Array.isArray(book.authors) ? book.authors.join(', '): ''}
                </div>
              </div>
            </li>
          ))}
        </ol>
    );
  }
}

export default ListBooks;
