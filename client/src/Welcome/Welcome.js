import React, { Component } from 'react';
import './Welcome.scss';

class Welcome extends Component {
  render() {
    return(
      <div className="welcome">
        <h1>Welcome</h1>
        <h2>Enter your name and location to create your personal dashboard.</h2>
      </div>
    )
  }
}

export default Welcome;
