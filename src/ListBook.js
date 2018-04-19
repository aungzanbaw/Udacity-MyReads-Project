import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBook extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        selectShelf: PropTypes.func.isRequired
    }
    
    render(){ 
        const shelves = {
            currentlyReading: ['Currently Reading', 'currentlyReading'],
            wantToRead: ['Want to Read', 'wantToRead'],
            read: ['Read', 'read']
        }
        return( 
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        { Object.keys(shelves).map(shelf =>
                            <BookShelf key={shelf}
                                shelf={shelves[shelf][1]}
                                title={shelves[shelf][0]}
                                books={ this.props.books }
                                selectShelf={ () =>  this.props.selectShelf } />
                        )} 
                    </div>
                </div>
                <div className="open-search"> 
                    <Link to="/search">Add a book</Link>
                </div>
          </div>
        );
    }
}

export default ListBook;