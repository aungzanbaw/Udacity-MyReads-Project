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

  updateBook(book, shelf){
    
    this.setState((state) => ({
      // books: state.books.filter((b) => {
      //   if(b.id === book.id)
      //     console.log(b,book)
      // })
    }));

    BooksAPI.update(book, shelf)
      .then(books => console.log(books))
      
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=> (
          <ListBook books={ this.state.books }/>
        )} />

        <Route path="/search" render={()=> (
          <SearchBook />
        )} />
        
      </div>
    )
  }
}

export default BooksApp
