import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import selectors from '../store/selectors.js';

class DayBar extends Component {

  render() {
    if (this.props.days) {
      let days = this.props.days.map((day) => 
      <NavLink key={day} to={`${this.props.match.url}/${day}`}>{day}</NavLink>);
      return (
        <div className="dayBar">
          {days}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return { days: selectors.getDays(state, props.match.params.year, props.match.params.month)};
};

export default connect(mapStateToProps, null)(DayBar);




