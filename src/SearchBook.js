import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'

class SearchBook extends Component{
    state = {
        query: '',
        books: [],
        myBooks: []
    } 
    
    componentDidMount(){
		BooksAPI.getAll()
			.then(books => {
				this.setState({ myBooks: books })
			})
	}

    updateQuery(query){   
        this.setState({ query }) 
        if(_.isEmpty(query.trim())){ 
            this.setState({
                query: "",
                books: []
            }) 
            return;
        }
        BooksAPI.search(_.upperFirst(query.trim()))
            .then(books => {
                    if(!_.isEmpty(books) || !_.isUndefined(books))
                        Object.keys(books).map(book => { 
                            if(!_.has(books,"error")) {  
                                books[book].shelf = 'none' 
                                Object.keys(this.state.myBooks).map(mybook => {
                                    if(this.state.myBooks[mybook].id === books[book].id){
                                        books[book].shelf = this.state.myBooks[mybook].shelf  
                                        return mybook
                                    } 
                                    return mybook
                                })
                            } 
                            return book
                        })  
                this.setState({ books })
            }) 
    } 

    render(){
        const { query, books } = this.state    
        return(
            <div className="search-books">
                <div className="search-books-bar"> 
                <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper"> 
                        <input type="text" autoFocus value={ query } onChange={e => this.updateQuery(e.target.value)} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">  
                    <ol className="books-grid">
                        {
                            
                            (_.has(books,"error") || _.isEmpty(books) || _.isUndefined(books)) && 
                            this.state.query !== "" && (
                                <div>
                                    <h1>No search result for '{ this.state.query }'</h1>
                                </div>
                            ) 
                        }
                        {
                            !_.has(books,"error") && !_.isEmpty(books) && Object.keys(books).map(key => <Book key={books[key].id} book={ books[key] } shelf={books[key].shelf} selectShelf={ this.props.selectShelf } /> )
                        } 
                    </ol>
                </div>
          </div>
        );
    }
}

export default SearchBook;