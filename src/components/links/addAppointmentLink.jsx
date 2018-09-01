import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class addAppointmentLink extends Component {
  render() {

    let year = this.props.match.params.year;
    let month = this.props.match.params.month;
    let day = this.props.match.params.day;

    return (
    <div className="nav">
        <NavLink to={`/${year}/${month}/${day}/create`}>ADD APPOINTMENT</NavLink>
    </div>
    );
  }
}

export default addAppointmentLink;
