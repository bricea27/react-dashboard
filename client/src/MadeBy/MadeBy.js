import React, { Component } from 'react';
import Logo from './Logo.js';
import './MadeBy.scss';

class MadeBy extends Component {

  render() {

    return(
      <a className='made-by' href='https://www.thebriceisright.com' rel="noopener noreferrer" target='_blank'><Logo /></a>
    )
  }
}

export default MadeBy;
