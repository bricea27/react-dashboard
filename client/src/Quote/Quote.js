import React, { Component } from 'react';
import './Quote.scss';

class Quote extends Component {
  render() {
    return(
      <h1 className="quote">{this.props.quote.joke}</h1>
    )
  }
}

Quote.defaultProps = {
  joke: ""
}

export default Quote;
