import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import selectors from '../store/selectors.js';
import AppointmentSnippet from './appointmentSnippet.jsx';


class AppointmentList extends Component {

  render() {
    if (this.props.apps) {

      let appointments = this.props.apps.map((app) => 
      <Link className="applink" key={app.id} to={`${this.props.match.url}/${app.name}`}><AppointmentSnippet appointment={app} /></Link>);
  
      return (
        <div className="appointmentList">
          {appointments}
        </div>
      );
    }
    return null;
  }
}


const mapStateToProps = (state, props) => {
  let year = props.match.params.year;
  let month = props.match.params.month;
  let day = props.match.params.day;
  return { apps: selectors.getAllAppointmentsPerDay(state, year, month, day) };
};

export default connect(mapStateToProps, null)(AppointmentList);

