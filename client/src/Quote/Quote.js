import React, { Component } from 'react';
import './Quote.scss';

class Quote extends Component {
  render() {
    return(
      <div className="quote-wrapper">
        <h1 className="quote">{this.props.quote.joke}</h1>
        <button className="inspire-me" onClick={this.props.onClick}>Inspire Me</button>
      </div>
    )
  }
}

Quote.defaultProps = {
  joke: ""
}

export default Quote;
