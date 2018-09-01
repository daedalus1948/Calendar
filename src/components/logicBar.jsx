import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import selectors from '../store/selectors.js';

import AddAppointmentLink from './links/addAppointmentLink.jsx';
import BackLink from './links/backLink.jsx';

class LogicBar extends Component {
  render() {
    if (this.props.apps) {
      return (
        <div className="logicBar">
            <Route path='/:year/:month/:day/:appointment/:action?' render={(props) => <BackLink {...props} />}/>
            <Route exact path='/:year/:month/:day' render={(props) => <AddAppointmentLink {...props} />}/>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return { apps: selectors.getAllAppointmentsPerDay(state, props.match.params.year, props.match.params.month, props.match.params.day)};
};

export default connect(mapStateToProps, null)(LogicBar);