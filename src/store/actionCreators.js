import actions from './actions.js';

function addAppointmentActionCreator (date, data) {

    return { 
        type: actions.ADD_APPOINTMENT,
        payload: {
            date : {
                year: date.year,
                month: date.month,
                day: date.day,
            },
            data: {
                id: data.id,
                name: data.name,
                description: data.description,
                priority: data.priority,
                start:{
                    hour: data.start.hour,
                    minute: data.start.minute
                },
                end:{
                    hour: data.end.hour,
                    minute: data.end.minute
                }
            }
        }
    }
}

function deleteAppointmentActionCreator (date, data) {
    return { 
        type: actions.DELETE_APPOINTMENT,
        payload: {
            date : {
                year: date.year,
                month: date.month,
                day: date.day
            },
            data: {
                id: data.id,
            }
        }
    }
}

function editAppointmentActionCreator (date, data) {
    return { 
        type: actions.EDIT_APPOINTMENT,
        payload: {
            date : {
                year: date.year,
                month: date.month,
                day: date.day
            },
            data: {
                id: data.id,
                name: data.name,
                description: data.description,
                priority: data.priority,
                start:{
                    hour: data.start.hour,
                    minute: data.start.minute
                },
                end:{
                    hour: data.end.hour,
                    minute: data.end.minute
                }
            }
        }
    }
}


const actionCreators = {
    addAppointmentActionCreator,
    deleteAppointmentActionCreator,
    editAppointmentActionCreator,
}

export default actionCreators;