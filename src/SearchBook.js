import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'

class SearchBook extends Component{
    state = {
        query: '',
        books: []
    } 

    clearQuery(){ 
        this.setState({
            query: "",
            books: []
        }) 
    }
    
    updateQuery(query){   
        this.setState({ query }) 
        if(query.trim() === ""){ 
            this.clearQuery() 
            return;
        } 
        BooksAPI.search(query)
            .then(books => this.setState({
                books
            }))
    } 

    render(){
        const { query, books } = this.state    
        return(
            <div className="search-books">
                <div className="search-books-bar"> 
                <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper"> 
                        <input type="text" 
                            value={ query }
                            onChange={ e => this.updateQuery(e.target.value)}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid"> 
                {_.isArray(books) && books.length !== 0 && (
                    books.map(book => (<Book key={book.id} book={ book } />)) 
                )} 
                </ol>
                </div>
          </div>
        );
    }
}

export default SearchBook;