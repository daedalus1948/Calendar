import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class backLink extends Component {
  render() {

    let year = this.props.match.params.year;
    let month = this.props.match.params.month;
    let day = this.props.match.params.day;
    let appointment = this.props.match.params.appointment;
    let action = this.props.match.params.action;

    return (
    <div className="nav">
        <Link to={ action ? `/${year}/${month}/${day}/${appointment}` : `/${year}/${month}/${day}` }>BACK</Link>
    </div>
    );
  }
}

export default backLink;
