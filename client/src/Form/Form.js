import React, { Component } from 'react';
import './Form.scss';

class Form extends Component {
  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <label>
          First Name *
          <input type="text" name="firstName" value={this.props.firstName} onChange={this.props.onChange} required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" value={this.props.lastName} onChange={this.props.onChange} />
        </label>
        <input type="submit" value="Save" />
      </form>
    )
  }
}

export default Form;
