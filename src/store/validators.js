import helpers from './helpers.js';
import selectors from './selectors.js';


export const nameValidator = (state, action, id) => {
    let date = action.payload.date;
    let selectedAppointment = selectors.getAppointmentByName(state, date.year, date.month, date.day, action.payload.data.name);
    // check if same name exists and it is a different appointment name in case of overriding the old name of the same appointment
    if (selectedAppointment && selectedAppointment.id !== id) {
        throw new Error("name already exists");
    }
}

export const dateRangeValidator = (state, action, id) => {
    let date = action.payload.date;
    let storeData = selectors.getAllAppointmentsPerDay(state, date.year, date.month, date.day);
    for (let i = 0; i<storeData.length; i++) {
        // check if same name exists and it is a different appointment name in case of overriding the old name of the same appointment
        if (helpers.dateRangeOverlap(action.payload.data, storeData[i]) && storeData[i].id !== id) {
            throw new Error("date range overlap");
        }
    }
}

// usage
// validatorManager(store.getState(), date, data, [nameValidator, dateRangeValidator]); // throws
export const validatorManager = (state, action, validators=[]) => {
    let errorMessages = [];
    validators.forEach((validator)=>{
        try {
            validator(state, action, action.payload.data.id);
        }
        catch (error) {
            errorMessages.push(error.message);
        }
    })
    if (errorMessages.length) {
        throw new Error(errorMessages);
    }
    return true;
}
