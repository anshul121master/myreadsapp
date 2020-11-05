import React from "react";

class Book extends React.Component {
  getBookShelf = event => {
    console.log(`getBookShelf started`);
    let shelfName = event.target.value;
    console.log(`shelfName changed to ${shelfName}`);
    //console.log(this.props.bookObj)
    this.props.updateBookShelf(this.props.bookObj, shelfName);
  };

  render() {
    let bookObj = this.props.bookObj;
    return (
      <li key={bookObj.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={
                bookObj.imageLinks !== undefined
                  ? {
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${bookObj.imageLinks.thumbnail})`
                    }
                  : {
                      width: 128,
                      height: 193,
                      backgroundImage: 'none'
                    }
              }
            ></div>
            <div className="book-shelf-changer">
              <select
                value={"shelf" in bookObj ? bookObj.shelf : "none"}
                onChange={this.getBookShelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option id="currentlyReading" value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookObj.title}</div>
          <div className="book-authors">
            {bookObj.authors ? bookObj.authors.join(", ") : "Author Unknown"}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
