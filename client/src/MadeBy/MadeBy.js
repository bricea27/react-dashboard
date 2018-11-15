import React, { Component } from 'react';
import Logo from './Logo.js';
import './MadeBy.scss';

class MadeBy extends Component {

  render() {

    return(
      <div className='made-by'>
        <a href='https://www.thebriceisright.com' rel="noopener noreferrer" target='_blank'><Logo /></a>
      </div>
    )
  }
}

export default MadeBy;
