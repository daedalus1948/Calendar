import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class deleteAppointmentLink extends Component {

    render() {

    let year = this.props.match.params.year;
    let month = this.props.match.params.month;
    let day = this.props.match.params.day;
    let appointment = this.props.match.params.appointment;

    return (
        <NavLink to={`/${year}/${month}/${day}/${appointment}/delete`}>Delete</NavLink>
    );
  }
}

export default deleteAppointmentLink;
