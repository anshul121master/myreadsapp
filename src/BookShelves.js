import React from 'react';
import Book from './Book';
class BookShelves extends React.Component{
    render(){
        let bookShelfName = this.props.bookShelfName;
        let booksListInShelf = this.props.booksListInShelf;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookShelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {booksListInShelf.map(bookObj =>{
                       return <Book key={bookObj.id} bookObj={bookObj} updateBookShelf={this.props.updateBookShelf}/>
                    })}
                    </ol>
                  </div>
                </div>
        )
    }
}

export default BookShelves;