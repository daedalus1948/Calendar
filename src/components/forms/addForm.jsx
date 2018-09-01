import React, { Component } from 'react';
import actionCreators from '../../store/actionCreators.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class AddForm extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
                start: {data:'', valid: false, regex: /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, class:1},
                end: {data:'', valid: false, regex: /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, class:1},
                name: {data:'', valid: false, regex: /^[a-zA-Z0-9]{1,30}$/, class:1},
                description: {data:'', valid: false, regex: /^[ a-zA-Z0-9]{1,400}$/, class:1},
                priority: {data:'', valid: false, regex: /^(low|medium|high)$/, class:1},
                formValid: false,
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

        this.updateFieldState = this.updateFieldState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateField(element) { // returns boolean
        return this.state[element.id].regex.test(element.value);
    }

    validateForm() { // returns boolean
        return this.state.name.valid && this.state.description.valid && this.state.priority.valid && this.state.start.valid && this.state.end.valid;
    }

    updateFieldState(e) {
        let isValid = this.validateField(e.target);
        let inputClass = isValid ? 2 : 3;
        this.setState({[e.target.id]: {data:e.target.value, valid: isValid, regex: this.state[e.target.id].regex, class:inputClass}}, ()=>{this.setState({formValid: this.validateForm()})});
    }

    buildAppointment() {
        const selectedDate = {
            year: this.props.match.params.year,
            month: this.props.match.params.month,
            day: this.props.match.params.day,
        };
        const data = {
            start: {
                hour: this.state.start.data.split(':')[0],
                minute: this.state.start.data.split(':')[1]
            },
            end: {
                hour: this.state.end.data.split(':')[0],
                minute: this.state.end.data.split(':')[1]
            },
            id: Math.random().toString(36).substring(9),
            name: this.state.name.data,
            description: this.state.description.data,
            priority: this.state.priority.data
        };
        return {selectedDate, data};
    }

    submitForm(e) {
        e.preventDefault();
        if (this.state.formValid) {
            let appointment = this.buildAppointment();
            try { // should be promise later when you do async in action creator
                this.props.dispatch(actionCreators.addAppointmentActionCreator(appointment.selectedDate, appointment.data));
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
                        <div className="time-input-wrapper">
                            <div className="label-wrapper">
                                <label>start</label>
                                <input id="start" value={this.state.start.data}  onChange={this.updateFieldState} className={this.state.inputClass[this.state.start.class]} type="text"></input>
                                <div className={this.state.errorClass[this.state.start.class]}>H:MM (0-9), HH:MM (10-24)</div>
                            </div>
                            <div className="label-wrapper">
                                <label>end</label>
                                <input id="end" value={this.state.end.data}  onChange={this.updateFieldState} className={this.state.inputClass[this.state.end.class]} type="text"></input>
                                <div className={this.state.errorClass[this.state.end.class]}>H:MM (0-9), HH:MM (10-24)</div>
                            </div>
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <div className="label-wrapper">
                            <label>name</label>
                            <input id="name" value={this.state.name.data}  onChange={this.updateFieldState} className={this.state.inputClass[this.state.name.class]} type="text"></input>
                        </div>
                        <div className={this.state.errorClass[this.state.name.class]}>non-empty, only digits and characters, maximum of 30</div>
                    </div>

                    <div className="input-wrapper">
                        <div className="label-wrapper">
                            <label>description</label>
                            <textarea id="description" value={this.state.description.data}  onChange={this.updateFieldState} className={this.state.inputClass[this.state.description.class]} type="text"></textarea>
                        </div>
                        <div className={this.state.errorClass[this.state.description.class]}>non-empty, only digits and characters, maximum of 400</div>
                    </div>

                    <div className="input-wrapper">
                        <div className="label-wrapper">
                            <label>priority</label>
                            <input id="priority" value={this.state.priority.data}  onChange={this.updateFieldState} className={this.state.inputClass[this.state.priority.class]} type="text"></input>
                        </div>
                        <div className={this.state.errorClass[this.state.priority.class]}>possible values - low, medium, high</div>
                    </div>
                    <div className="input-wrapper">
                        <button onClick={this.submitForm} disabled={!this.state.formValid} className={this.state.formValid ? 'formInput valid' : 'formInput invalid'} type="submit">ADD APPOINTMENT</button>
                    </div>
                    <div className="input-error">{this.state.backendErrors}</div>
                </form>
        );
  }
}


export default connect(null,null)(AddForm);

