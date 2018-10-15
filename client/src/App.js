import React, { Component } from 'react';
import Quote from './Quote/Quote';
import Footer from './Footer/Footer';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuote: {
        joke: ""
      },
    }
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = () => {
    console.log("fetch quote");
    fetch("/quote/Brice")
      .then(res => res.json())
      .then(quote => {
        console.log(quote);
        this.setState({ currentQuote: quote.value });
      });
  }

  render() {
    return (
      <div className="App">
        <Quote quote={this.state.currentQuote}/>
        <Footer fetchQuote={this.fetchQuote} />
      </div>
    );
  }
}

export default App;
