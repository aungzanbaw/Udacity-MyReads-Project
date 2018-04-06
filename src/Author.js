import React, { Component } from 'react';

class Author extends Component{
    render(){
        return(
            <div className="book-authors" key={this.props.i}>{ this.props.author }</div>
        )
    }
}

export default Author;