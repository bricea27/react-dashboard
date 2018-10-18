import React, { Component } from 'react';
import './Temperature.scss';

class Temperature extends Component {
  render() {

    let tempClass = `temperature ${this.props.tempType}`;
    let tempKey = this.props.tempType === "high" ? "apparentTemperatureHigh" : "apparentTemperatureLow";

    return(
      <div className={tempClass}><h5>{this.props.tempType}: <span>{Math.ceil(this.props.weather.daily.data[0][tempKey])}˚</span></h5></div>
    )
  }
}

export default Temperature;
