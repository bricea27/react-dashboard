import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import './Form.scss';

class Form extends Component {

  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <label>
          First Name *
          <input type="text" name="firstName" placeholder="Chuck" value={this.props.firstName} onChange={this.props.onChange} required tabIndex="1" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" placeholder="Norris" value={this.props.lastName} onChange={this.props.onChange} tabIndex="2" />
        </label>
        <label>
          Location
          <Geosuggest name="location" placeholder={"Search"} initialValue={this.props.locationLabel} onSuggestSelect={this.props.onLocationChange} autoActivateFirstSuggest={false} tabIndex="3" />
        </label>
        <div className="form-footer">
          <input type="submit" value="Save" tabIndex="4" />
        </div>
      </form>
    )
  }
}

export default Form;
