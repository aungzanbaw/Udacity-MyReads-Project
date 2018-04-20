import React, { Component } from 'react' 
import Book from './Book';
import PropTypes from 'prop-types'

class BookShelf extends Component{
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        selectShelf: PropTypes.func.isRequired
    }

    render(){
        const { books } = this.props
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ this.props.title }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books
                                .filter(book => book.shelf === this.props.shelf)
                                .map(book => (
                                    <Book key={book.id} book={ book } selectShelf={ this.props.selectShelf }/>
                                ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf