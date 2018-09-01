import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class editAppointmentLink extends Component {

    render() {

    let year = this.props.match.params.year;
    let month = this.props.match.params.month;
    let day = this.props.match.params.day;
    let appointment = this.props.match.params.appointment;

    return (
        <NavLink to={`/${year}/${month}/${day}/${appointment}/edit`}>Edit</NavLink>
    );
  }
}

export default editAppointmentLink;
