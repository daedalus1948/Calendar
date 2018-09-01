import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import actionCreators from '../../store/actionCreators.js';
import selectors from '../../store/selectors.js';

class DeleteForm extends Component {
  
    constructor(props) {
        super(props);

        let appointment = this.props.app;

        this.state = {
                id: appointment.id,
                formValid: true,
                backendErrors: '',
                inputClass: {
                    1: 'formInput',
                    2: 'formInput valid',
                    3: 'formInput invalid'
                },
                errorClass:{
                    1: 'input-error invisible',
                    2: 'input-error invisible',
                    3: 'input-error visible'
                },
                shouldRedirect: false
            }

        this.submitForm = this.submitForm.bind(this);

    }

    buildAppointment() {
        const selectedDate = {
            year: this.props.match.params.year,
            month: this.props.match.params.month,
            day: this.props.match.params.day,
        };
        const data = {
            id: this.state.id
        };
        return {selectedDate, data}
    }

    submitForm(e) {
        e.preventDefault();
        if (this.state.formValid) {
            let appointment = this.buildAppointment();
            try { // should be promise later when you do async in action creator
                this.props.dispatch(actionCreators.deleteAppointmentActionCreator(appointment.selectedDate, appointment.data));
                this.setState({shouldRedirect: true}); // hide the form by redirecting back to the appointmentList url
            }
            catch(error) {
                // update form error stuff
                console.log(error);
                this.setState({backendErrors: error.toString()}); // hide the form by redirecting back to the appointmentList url 
            }
        
        }
    }
  
    render() {

        if (this.state.shouldRedirect) { // on succesfull formSubmit call, state is updated, and the render redirects back
            let year = this.props.match.params.year;
            let month = this.props.match.params.month;
            let day = this.props.match.params.day;
            return <Redirect to={`/${year}/${month}/${day}`}/>;
        }

        return (
                <form className="appointmentForm">
                    <div className="input-wrapper">
                        <button onClick={this.submitForm} disabled={!this.state.formValid} className={this.state.formValid ? 'formInput valid' : 'formInput invalid'} type="submit">DELETE APPOINTMENT</button>
                    </div>
                    <div className="input-error">{this.state.backendErrors}</div>
                </form>
        );
  }
}

const mapStateToProps = (state, props) => {
    let year = props.match.params.year;
    let month = props.match.params.month;
    let day = props.match.params.day;
    let appName = props.match.params.appointment;
    return { app: selectors.getAppointmentByName(state, year, month, day, appName) };
};
  
export default connect(mapStateToProps, null)(DeleteForm);

