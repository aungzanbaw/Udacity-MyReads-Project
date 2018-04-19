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

  	selectShelf = (book, shelf) => {  
		BooksAPI.update(book, shelf)
			.then(()=> {
				this.setState((state) => ({
					books: state.books.map(b => {
						if(b.id === book.id) b.shelf = shelf; 
						return b
					})
				}))
			}) 
	}
	
	updateShelf = (Book, shelf) => {   
		Book.shelf = shelf
		this.setState((state) => ({
			books: state.books.map(book => {
				if(book.id === Book.id) book.shelf = shelf; 
				return book
			})
		}))
	
		if(!this.state.books.some(b => b.id === Book.id)){
			this.setState((state) => ({
				books: state.books.concat(Book)
			}))
		} 
		BooksAPI.update(Book, shelf)
	}

  	render() {
		return ( <div className="app">
			<Route exact path="/" render={()=> ( <ListBook books={ this.state.books } selectShelf={ this.selectShelf }/> )} /> 
			<Route path="/search" render={()=> ( <SearchBook selectShelf={ this.updateShelf }/> )} /> 
		</div>
	)}
}

export default BooksApp
