import React, { Component } from 'react';
import './InspireMe.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

class InspireMe extends Component {
  render() {
    return(
      <button className="inspire-me" onClick={this.props.onClick}>Inspire Me</button>
    )
  }
}

export default InspireMe;
