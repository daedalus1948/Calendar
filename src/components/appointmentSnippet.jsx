import React, { Component } from 'react';

import EditAppointmentLink from './links/editAppointmentLink.jsx';
import DeleteAppointmentLink from './links/deleteAppointmentLink.jsx';

class AppointmentSnippet extends Component {
  render() {

    return (
      <div className="appointment">
        <div className="appointment-time">
          <div className="start-time">
            {this.props.appointment.start.hour}:{this.props.appointment.start.minute}
          </div>
          <div className="end-time">
            {this.props.appointment.end.hour}:{this.props.appointment.end.minute}
          </div>
        </div>
        <div className="appointment-content">
          <div className="name">
            {this.props.appointment.name}
          </div>
          <div className="priority">
            {this.props.appointment.priority}
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentSnippet;
