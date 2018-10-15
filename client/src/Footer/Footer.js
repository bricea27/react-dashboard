import React, { Component } from 'react';
import InspireMe from './InspireMe';
import './Footer.scss';


class Footer extends Component {
  render() {
    return(
      <InspireMe onClick={this.props.fetchQuote} />
    )
  }
}

export default Footer;
