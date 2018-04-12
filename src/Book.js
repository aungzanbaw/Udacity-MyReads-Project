import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Author from './Author'
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        selectShelf: PropTypes.func.isRequired
    }

    selectChange(book, e){   
        this.props.selectShelf(book.id, e.target.value)
        BooksAPI.update(book, e.target.value)  
    }

    render(){
        const { book } = this.props
        return(
            <li> 
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                        <select onChange={ e => this.selectChange(book, e) } value={ book.shelf }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    { _.isArray(book) && 
                        book.length !== 0 && ( 
                            book.authors.map((author,i) =>( <Author key={i} author={ author }/> )) 
                        )
                    }
                </div>
            </li>
        )
    }
}

export default Book;