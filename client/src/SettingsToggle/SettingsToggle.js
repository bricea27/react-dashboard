import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SettingsToggle.scss';

library.add(faUserCog, faTimes);

class SettingsToggle extends Component {

  render() {

    return (
      <span id="settingsToggle">
        {
          (this.props.showDashboardState)
          ? <FontAwesomeIcon icon="user-cog" onClick={this.props.hideDashboard} />
          : <FontAwesomeIcon icon="times" onClick={this.props.showDashboard} />
        }
      </span>
    );
  }
}

export default SettingsToggle;
