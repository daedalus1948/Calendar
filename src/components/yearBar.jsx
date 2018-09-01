import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import selectors from '../store/selectors.js';

class YearBar extends Component {

  render() {

    let years = this.props.years.map((year) => 
    <NavLink key={year} to={`${this.props.match.url}${year}`}>{year}</NavLink>);
    
    return (
      <div className="yearBar">
        {years}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { years: selectors.getYears(state) };
};

export default connect(mapStateToProps, null)(YearBar);


