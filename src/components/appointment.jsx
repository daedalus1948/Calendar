import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectors from '../store/selectors.js';
import EditAppointmentLink from './links/editAppointmentLink.jsx';
import DeleteAppointmentLink from './links/deleteAppointmentLink.jsx';
import NotFound from './notFound.jsx';

class Appointment extends Component {
  
  render() {
    if (this.props.app) {
      let appointment = this.props.app;
      return (
        <div className="appointment">
          <div className="appointment-time">
            <div className="start-time">
              {appointment.start.hour}:{appointment.start.minute}
            </div>
            <div className="end-time">
              {appointment.end.hour}:{appointment.end.minute}
            </div>
          </div>
          <div className="appointment-content">
            <div className="name">
              {appointment.name}
            </div>
            <div className="description">
              {appointment.description}
            </div>
            <div className="priority">
              {appointment.priority}
            </div>
          </div>
          <div className="appointment-links">
            <EditAppointmentLink match={this.props.match} />
            <DeleteAppointmentLink match={this.props.match} />
          </div>
        </div>
      );
    }
    else {
      return <NotFound />
    }
  }
}

const mapStateToProps = (state, props) => {
  let year = props.match.params.year;
  let month = props.match.params.month;
  let day = props.match.params.day;
  let appName = props.match.params.appointment;
  return { app: selectors.getAppointmentByName(state, year, month, day, appName) };
};

export default connect(mapStateToProps, null)(Appointment);

