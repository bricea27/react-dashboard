import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import './Form.scss';

class Form extends Component {

  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <label>
          First Name *
          <input type="text" name="firstName" placeholder="Chuck" value={this.props.firstName} onChange={this.props.onChange} required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" placeholder="Norris" value={this.props.lastName} onChange={this.props.onChange} />
        </label>
        <label>
          Location *
          <Geosuggest name="location" placeholder={"Search"} onSuggestSelect={this.props.onLocationChange} autoActivateFirstSuggest={false} />
        </label>
        <div className="form-footer">
          <input type="submit" value="Save" />
        </div>
      </form>
    )
  }
}

export default Form;
