import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SettingsToggle.scss';

library.add(faUserCog, faTimes);

class SettingsToggle extends Component {

  render() {

    return (
      <FontAwesomeIcon
        id="settingsToggle"
        icon={(this.props.showDashboardState) ? "user-cog" : "times"}
        onClick={(this.props.showDashboardState) ? this.props.hideDashboard : this.props.showDashboard}
      />
    );
  }
}

export default SettingsToggle;
