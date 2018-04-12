import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBook from './ListBook'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount(){
		BooksAPI.getAll()
			.then(books => {
				this.setState({ books })
			})
	}

  selectShelf = (bookId, shelf) => {  
    this.setState((state) => ({
      	books: state.books.map(book => {
			if(book.id === bookId) book.shelf = shelf; 
			return book
      	})
    }))
  }

  	render() {
		return ( <div className="app">
			<Route exact path="/" render={()=> ( <ListBook books={ this.state.books } selectShelf={ this.selectShelf }/> )} /> 
			<Route path="/search" render={()=> ( <SearchBook /> )} /> 
		</div>
	)}
}

export default BooksApp
