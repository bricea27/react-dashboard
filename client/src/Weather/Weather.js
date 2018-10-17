import React, { Component } from 'react';
import WeatherIcon from 'react-icons-weather';
import './Weather.scss';

class Weather extends Component {
  render() {
    return(
      <div className="weather">
        <WeatherIcon name="darksky" iconId={this.props.weather.currently.icon} />
        <h2>{this.props.locationLabel}</h2>
        <h3>{this.props.weather.currently.summary}, <span>{Math.round(this.props.weather.currently.temperature)}˚</span></h3>
      </div>
    )
  }
}

export default Weather;
