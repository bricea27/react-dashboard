import React, { Component } from 'react';
import WeatherIcon from 'react-icons-weather';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Weather.scss';

library.add(faMapMarkerAlt);

class Weather extends Component {
  render() {

    if (!this.props.weather) {
      return(
        <div className="weather">
          <FontAwesomeIcon icon="map-marker-alt" />
          <h2>Add Location</h2>
        </div>
      )
    } else {
      return(
        <div className="weather">
          <WeatherIcon name="darksky" iconId={this.props.weather.currently.icon} />
          <h2>{this.props.locationLabel}</h2>
          <h3>{this.props.weather.currently.summary}, <span>{Math.round(this.props.weather.currently.temperature)}˚</span></h3>
        </div>
      )
    }

  }
}

export default Weather;
