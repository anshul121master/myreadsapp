import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
class Search extends React.Component {
  state = {
    availableBooks: []
  };

  search = event => {
    console.log("search called");
    let query = event.target.value;
    console.log(query);
    if (query !== "") {
      BooksAPI.search(query).then(availableBooks => {
        if ("error" in availableBooks) {
          this.setState({
            availableBooks: []
          });
        } else {
          this.setState({
            availableBooks
          });
        }
      });
    } else {
      this.setState({
        availableBooks: []
      });
    }
  };

  checkBookExistInShelf = book => {
    let bookInShelf = this.props.allBooksInShelves.find(
      bookInShelf => book.id === bookInShelf.id
    );
    return bookInShelf;
  };

  render() {
    let availableBooks = this.state.availableBooks.map(book => {
      let bookInShelf = this.checkBookExistInShelf(book);
      if (bookInShelf !== undefined) {
        book.shelf = bookInShelf.shelf;
        return book;
      } else {
        return book;
      }
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.search}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {availableBooks.map(bookObj => {
              return (
                <Book
                  key={bookObj.id}
                  bookObj={bookObj}
                  updateBookShelf={this.props.updateBookShelf}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
