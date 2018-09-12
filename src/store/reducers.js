import initialState from './initialState.js';

// not a reducer, a helper function
const dateDeepCopy = (state, action, logic) => { // simplified for all dates up to the last level
    return {
        ...state,
        [action.payload.date.year] : {
            ...state[action.payload.date.year],
            [action.payload.date.month] : {
                ...state[action.payload.date.year][action.payload.date.month],
                [action.payload.date.day] : logic()
            }
        }
    }
}


const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_APPOINTMENT':
            return dateDeepCopy(state, action, () => {
                return [
                    ...state[action.payload.date.year][action.payload.date.month][action.payload.date.day],
                    action.payload.data
                ]
            })
        case 'EDIT_APPOINTMENT':
            return dateDeepCopy(state, action, () => {
                return [
                    ...state[action.payload.date.year][action.payload.date.month][action.payload.date.day]
                        .map(item => { return item.id === action.payload.data.id ? { ...item, ...action.payload.data } : item})
                ]
            })
        case 'DELETE_APPOINTMENT':
            return dateDeepCopy(state, action, () => {
                return [
                    ...state[action.payload.date.year][action.payload.date.month][action.payload.date.day]
                        .filter(item => item.id !== action.payload.data.id)
                ]
            })
        default:
            return state
    }
}

export default {
    calendarReducer,
    dateDeepCopy
};