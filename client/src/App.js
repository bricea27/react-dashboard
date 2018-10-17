import React, { Component } from 'react';
import SettingsToggle from './SettingsToggle/SettingsToggle';
import Welcome from './Welcome/Welcome';
import Form from './Form/Form';
import Weather from './Weather/Weather';
import Quote from './Quote/Quote';
import InspireMe from './InspireMe/InspireMe';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      locationLabel: "Indianapolis",
      latitude: 39.7706458,
      longitude: -86.1556021,
      weather: null,
      userConfigured: false,
      showDashboard: false,
      currentQuote: {
        joke: ""
      },
    }
  }

  componentDidMount() {

  }

  getWeather = () => {
    fetch(`/weather/${this.state.latitude}&${this.state.longitude}`)
      .then(res => res.json())
      .then(weather => {
        this.setState({ weather: weather });
      });
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
    this.getWeather();
    this.fetchQuote();
    e.preventDefault();
  }

  updateName = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]:  value });
  }

  updateLocation = (e) => {
    if (e) {
      this.setState({ locationLabel: e.label });
      this.setState({ latitude: e.location.lat });
      this.setState({ longitude: e.location.lng });
    }
  }

  showDashboard = () => {
    this.setState({ showDashboard: true });
  }

  hideDashboard = () => {
    this.setState({ showDashboard: false });
  }

  render() {

    return (
      <div className={(this.state.showDashboard) ? "App show-dashboard" : "App"}>

        {this.state.userConfigured &&
          <SettingsToggle showDashboardState={this.state.showDashboard} showDashboard={this.showDashboard} hideDashboard={this.hideDashboard} />
        }

        <section className="settings">
          <Welcome />
          <Form onSubmit={this.userFormSubmit} onChange={this.updateName} onLocationChange={this.updateLocation} firstName={this.state.firstName} lastName={this.state.lastName} />
        </section>

        <section className="dashboard">
          {this.state.weather !== null &&
            <Weather locationLabel={this.state.locationLabel} weather={this.state.weather} />
          }
          <Quote quote={this.state.currentQuote}/>
          <InspireMe onClick={this.fetchQuote} />
        </section>

      </div>
    );
  }
}

export default App;
