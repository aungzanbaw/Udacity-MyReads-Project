import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import  * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component{
    state = {
        query: '',
        books: []
    }
    
    componentDidMount(){
        
    }

    updateQuery(query = ""){ 
        if(query == "") return;
        this.setState({ query: query })  
        console.log(query)
        BooksAPI.search(query,10)
          .then(books => {
            console.log(books)
            this.setState({ books: books })
          })
    }

    clearQuery(){

    }

    render(){
        // const { contacts, onDeleteContact } = this.props
        // const { query } = this.state

        // let showingContacts = []
        // if (query) {
        // const match = new RegExp(escapeRegExp(query, 'i'))
        // showingContacts = contacts.filter((contact) => match.test(contact.name))
        // } else {
        // showingContacts = contacts
        // }

        // showingContacts.sort(sortBy('name'))
        
        return(
            <div className="search-books">
                <div className="search-books-bar"> 
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper"> 
                    <input type="text" 
                    value={ this.state.query }
                    onChange={ e => this.updateQuery(e.target.value) }
                    placeholder="Search by title or author"/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {
                    this.state.books 
                        .map(book => (
                            <Book key={book.id} book={ book } />
                        ))
                }
                </ol>
                </div>
          </div>
        );
    }
}

export default SearchBook;