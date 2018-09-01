// selectors MUST NOT MUTATE STATE SINCE THEY HAVE DIRECT ACCESS TO THE STORE, ALWAYS DEEP COPY

import helpers from './helpers.js';

const getYears = (state) => [...Object.keys(state)];
const getMonths = (state, year) => check(state, year) ? [...Object.keys(state[year])] : undefined;
const getDays = (state, year, month) => check(state, year, month) ? [...Object.keys(state[year][month])] : undefined;
const getAllAppointmentsPerDay = (state, year, month, day) => check(state, year, month, day) ? [...state[year][month][day]].sort(helpers.sorter) : undefined;
const getAppointmentByID = (state, year, month, day, id) => check(state, year, month, day) ? [...state[year][month][day]].filter((app)=>app.id==id)[0] : undefined;
const getAppointmentByName = (state, year, month, day, name) => check(state, year, month, day) ? [...state[year][month][day]].filter((app)=>app.name==name)[0] : undefined;


const check = (...params) => { // checks if state, state[year], state[year][month]... is undefined
    let currentParam = params[0];
    for (let i = 1; i<params.length+1;i++) {
        if (currentParam == undefined) {
            return false;
        }
        currentParam = currentParam[params[i]];
    }
    return true;
}


export default {
    check,
    getYears,
    getMonths,
    getDays,
    getAllAppointmentsPerDay,
    getAppointmentByID,
    getAppointmentByName
}






