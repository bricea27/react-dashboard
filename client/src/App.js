import React, { Component } from 'react';
import SimpleStorage from 'react-simple-storage';
import SettingsToggle from './SettingsToggle/SettingsToggle';
import Welcome from './Welcome/Welcome';
import Temperature from './Temperature/Temperature';
import Form from './Form/Form';
import Weather from './Weather/Weather';
import Quote from './Quote/Quote';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      locationLabel: "",
      latitude: "",
      longitude: "",
      weather: "",
      weatherColor1: "",
      weatherColor2: "",
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
    if (this.state.latitude === "" || this.state.longitude === "") {
      this.setState({ weather: "" });
      return;
    }
    fetch(`/weather/${this.state.latitude}&${this.state.longitude}`)
      .then(res => res.json())
      .then(weather => {
        this.setState({ weather: weather });
        this.calculateWeatherColors(this.state.weather.daily.data[0]);
      });
  }

  //determine an HSL color valyue based on the temperature and cloud cover
  calculateWeatherColors = (data) => {

    //we'll use the temperature value to determine our hues

    //grab the day's apprent high temp
    let highTemp = Math.round(data.apparentTemperatureHigh);
    //highest temp on our scale is 100 (anything over will be calculated as 100)
    highTemp = highTemp > 100 ? 100 : highTemp;
    //lowest temp on our scale is 0 (anything under will be calculated as 0)
    highTemp = highTemp < 0 ? 0 : highTemp;

    //grab the day's apprent low temp
    let lowTemp = Math.floor(data.apparentTemperatureLow);
    //highest temp on our scale is 100 (anything over will be calculated as 100)
    lowTemp = lowTemp > 100 ? 100 : lowTemp;
    //lowest temp on our scale is 0 (anything under will be calculated as 0)
    lowTemp = lowTemp < 0 ? 0 : lowTemp;

    //calculate our hues...
    //coldest value is 240, warmest is 0 (on our hue scale)
    let hue1 = Math.round(240 - (240 * (highTemp / 100)));
    let hue2 = Math.round(240 - (240 * (lowTemp / 100)));

    //we'll use the cloudCover value to determine our saturation
    let cloudCover = data.cloudCover;
    //our mininum saturation will be 50 (max is 100%)
    let saturation = 50 + (50 - (50 * cloudCover));

    //these two colors will be used to render our weather color gradient
    this.setState({ weatherColor1: `hsl(${hue1}, ${saturation}%, 50%)` });
    this.setState({ weatherColor2: `hsl(${hue2}, ${saturation}%, 50%)` });
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

  //this will be fired once our state has been hydrated with local storage data
  loadDashboard = () => {
    if (this.state.userConfigured) {
      this.getWeather();
      this.fetchQuote();
    }
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

    if (!e) {
      this.setState({ locationLabel: ""});
      this.setState({ latitude: "" });
      this.setState({ longitude: "" });
      return;
    }

    let latitude = (e.location && e.location.lat) ? e.location.lat : "";
    let longitude = (e.location && e.location.lng) ? e.location.lng : "";

    this.setState({ locationLabel: e.label });
    this.setState({ latitude: latitude });
    this.setState({ longitude: longitude });
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

        <SimpleStorage parent={this} onParentStateHydrated={this.loadDashboard} />

        {this.state.userConfigured &&
          <SettingsToggle
            showDashboardState={this.state.showDashboard}
            showDashboard={this.showDashboard}
            hideDashboard={this.hideDashboard}
          />
        }

        <section className="settings">
          <Welcome userConfigured={this.state.userConfigured} />
          <Form
            onSubmit={this.userFormSubmit}
            onChange={this.updateName}
            onLocationChange={this.updateLocation}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            locationLabel={this.state.locationLabel}
            userConfigured={this.state.userConfigured}
            hideDashboard={this.hideDashboard}
          />
        </section>

        <section
          className="dashboard"
          style={{ background: `linear-gradient(180deg, ${this.state.weatherColor1}, ${this.state.weatherColor2})`}}>

          {this.state.weather.daily &&
            <Temperature weather={this.state.weather} tempType="high" />
          }

          {this.state.weather !== null &&
            <Weather locationLabel={this.state.locationLabel} weather={this.state.weather} />
          }

          <Quote quote={this.state.currentQuote} onClick={this.fetchQuote} />

          {this.state.weather.daily &&
            <Temperature weather={this.state.weather} tempType="low" />
          }

        </section>

      </div>
    );
  }
}

export default App;
