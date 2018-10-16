import React, { Component } from 'react';
import Form from './Form/Form';
import Quote from './Quote/Quote';
import InspireMe from './InspireMe/InspireMe';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(faUserCog, faTimes);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "Chuck",
      lastName: "Norris",
      userConfigured: false,
      showDashboard: false,
      currentQuote: {
        joke: ""
      },
    }
  }

  componentDidMount() {
    // this.fetchQuote();
  }

  //Retrieve a quote from the Internet Chuck Norris Database
  fetchQuote = () => {
    fetch(`/quote/${this.state.firstName}&${this.state.lastName}`)
      .then(res => res.json())
      .then(quote => {
        this.setState({ currentQuote: quote.value });
        this.setState({ userConfigured: true });
        this.setState({ showDashboard: true });
      });
  }

  userFormSubmit = (e) => {
    this.fetchQuote();
    e.preventDefault();
  }

  updateName = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]:  value });
  }

  showDashboard = () => {
    this.setState({ showDashboard: true });
  }

  hideDashboard = () => {
    this.setState({ showDashboard: false });
  }

  render() {

    let appClassState = `App ${(this.state.showDashboard) ? "show-dashboard" : ""}`;

    return (
      <div className={appClassState}>
        {this.state.userConfigured &&
          <span id="toggleForm">
          {
            (this.state.showDashboard)
            ? <FontAwesomeIcon icon="user-cog" onClick={this.hideDashboard} />
            : <FontAwesomeIcon icon="times" onClick={this.showDashboard} />
          }
          </span>
        }
        <section className="form">
          <div className="welcome">
            <h1>Welcome</h1>
            <h2>Enter your name and location to create your personal dashboard.</h2>
          </div>
          <Form onSubmit={this.userFormSubmit} onChange={this.updateName} firstName={this.state.firstName} lastName={this.state.lastName} />
        </section>
        <section className="dashboard">
          <Quote quote={this.state.currentQuote}/>
          <InspireMe onClick={this.fetchQuote} />
        </section>
      </div>
    );
  }
}

export default App;
