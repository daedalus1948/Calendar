import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

import YearBar from './yearBar.jsx';
import MonthBar from './monthBar.jsx';
import DayBar from './dayBar.jsx';
import LogicBar from './logicBar.jsx';

class NavBar extends Component {
  

  render() {

    if (this.props.location.pathname == '/') { // redirect tu current day appointments
      let date = new Date();
      return <Redirect to={`/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}/>;
    }

    return (
      <div className="navBar">
        <div className="nav"><Link to='/'>HOME</Link> </div>
        <Route path='/' render={(props) => <YearBar {...props} />} />
        <Route path='/:year/' render={(props) => <MonthBar {...props} />} />
        <Route path='/:year/:month/' render={(props) => <DayBar {...props} />} />
        <Route path='/:year/:month/:day' component={LogicBar} />
      </div>
    );
  }
}

export default NavBar;

