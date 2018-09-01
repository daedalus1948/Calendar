import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppointmentList from './appointmentList.jsx';
import Appointment from './appointment.jsx';
import AddForm from './forms/addForm.jsx';
import EditForm from './forms/editForm.jsx';
import DeleteForm from './forms/deleteForm.jsx';

class Content extends Component {

  render() {
    return (
      <div className="content">
          <Switch>
            <Route exact path='/:year/:month/:day' render={(props) => <AppointmentList {...props} />}/>
            <Route exact path='/:year/:month/:day/create' render={(props) => <AddForm {...props} />}/>
            <Route exact path='/:year/:month/:day/:appointment' render={(props) => <Appointment {...props} />}/>
            <Route exact path='/:year/:month/:day/:appointment/edit' render={(props) => <EditForm {...props} />}/>
            <Route exact path='/:year/:month/:day/:appointment/delete' render={(props) => <DeleteForm {...props} />}/>
          </Switch>
      </div>
    );
  }
}


export default Content;
