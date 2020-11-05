import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import BookShelves from "./BookShelves";
import Search from "./Search";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    allBooksInShelves: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let allBooksInShelves = books;
      let currentlyReading = books.filter(
        book => book.shelf === "currentlyReading"
      );
      let wantToRead = books.filter(book => book.shelf === "wantToRead");
      let read = books.filter(book => book.shelf === "read");
      this.setState({
        allBooksInShelves,
        currentlyReading,
        wantToRead,
        read
      });
    });
  }

  updateBookShelf = (bookObj, shelfName) => {
    console.log("updateBookShelf called");
    if (bookObj.shelf) {
      //call came from home page
      let shelf = bookObj.shelf;
      if (shelfName === "none") {
        this.setState(currentState => ({
          [shelf]: currentState[shelf].filter(book => book.id !== bookObj.id),
          allBooksInShelves: currentState.allBooksInShelves.filter(
            book => book.id !== bookObj.id
          )
        }));
      } else {
        //changing shelf property in bookObj
        bookObj.shelf = shelfName;
        this.setState(currentState => ({
          [shelf]: currentState[shelf].filter(book => book.id !== bookObj.id),
          [shelfName]: currentState[shelfName].concat([bookObj])
        }));
      }

      BooksAPI.update(bookObj, shelfName).then(res =>
        console.log(`Response from update is ${JSON.stringify(res)}`)
      );
    } else {
      //came from search page
      bookObj.shelf = shelfName;
      this.setState(currentState => ({
        [shelfName]: currentState[shelfName].concat([bookObj]),
        allBooksInShelves: currentState.allBooksInShelves.concat([bookObj])
      }));
      BooksAPI.update(bookObj, shelfName).then(res =>
        console.log(`Response from update is ${JSON.stringify(res)}`)
      );
    }
  };

  render() {
    //{this.search()};
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelves
                    bookShelfName="Currently Reading"
                    booksListInShelf={this.state.currentlyReading}
                    updateBookShelf={this.updateBookShelf}
                  />
                  <BookShelves
                    bookShelfName="Want to Read"
                    booksListInShelf={this.state.wantToRead}
                    updateBookShelf={this.updateBookShelf}
                  />
                  <BookShelves
                    bookShelfName="Read"
                    booksListInShelf={this.state.read}
                    updateBookShelf={this.updateBookShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <Search
              updateBookShelf={(bookObj, shelfName) => {
                this.updateBookShelf(bookObj, shelfName);
                // history.push("/");
              }}
              allBooksInShelves={this.state.allBooksInShelves}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
