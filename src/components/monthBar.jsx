import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import selectors from '../store/selectors.js';


class MonthBar extends Component {
  
  render() {

    if (this.props.months) {
      let months = this.props.months.map((month) => 
      <NavLink key={month} to={`${this.props.match.url}/${month}`}>{month}</NavLink>);
      return (
        <div className="monthBar">
          {months}
        </div>
      );
    }
    return null;
  }
}


const mapStateToProps = (state, props) => {
  return { months: selectors.getMonths(state, props.match.params.year) };
};

export default connect(mapStateToProps, null)(MonthBar);


