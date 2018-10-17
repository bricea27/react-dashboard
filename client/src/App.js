import React, { Component } from 'react';
import SimpleStorage from 'react-simple-storage';
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
      locationLabel: "",
      latitude: "",
      longitude: "",
      weather: "",
      weatherColor: "",
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
    if (this.state.latitude === ""|| this.state.longitude === "") {
      this.setState({ weather: "" });
      return;
    }
    fetch(`/weather/${this.state.latitude}&${this.state.longitude}`)
      .then(res => res.json())
      .then(weather => {
        this.setState({ weather: weather });
        this.calculateWeatherColor(this.state.weather.currently);
      });
  }

  //determine an HSL color valyue based on the temperature and cloud cover
  calculateWeatherColor = (data) => {
    //we'll use the temperature value to determine our hue
    let temp = Math.round(data.temperature);
    //highest temp on our scale is 90 (anything over will be calculated as 90)
    temp = temp > 90 ? 90 : temp;
    //lowest temp on our scale is 0 (anything under will be calculated as 0)
    temp = temp < 0 ? 0 : temp;

    //calculate our hue...
    //coldest value is 180, warmest is 0 (on our hue scale)
    let hue = 180 - (180 * (temp / 90));

    console.log(temp, hue);

    //we'll use the cloudCover value to determine our saturation
    let cloudCover = data.cloudCover * 100;
    let saturation = 100 + cloudCover;
    saturation = saturation < 20 ? 20 : saturation; //lowest saturation allowed is 20%
    saturation = saturation > 80 ? 80 : saturation; //highest saturation allowed is 80%

    this.setState({ weatherColor: `hsl(${hue}, ${saturation}%, 50%)` });
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

        <SimpleStorage parent={this} />

        {this.state.userConfigured &&
          <SettingsToggle
            showDashboardState={this.state.showDashboard}
            showDashboard={this.showDashboard}
            hideDashboard={this.hideDashboard}
          />
        }

        <section className="settings">
          <Welcome />
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

        <section className="dashboard" style={{background: this.state.weatherColor}}>
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
