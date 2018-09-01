import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers.js';
import initialState from './store/initialState.js';

import { validatorManager, nameValidator, dateRangeValidator } from './store/validators.js';

const validatorMiddleware = store => next => action => {
    if (action.type == "ADD_APPOINTMENT" || action.type == "EDIT_APPOINTMENT") {
        validatorManager(store.getState(), action, [nameValidator, dateRangeValidator]); // throws
    }
    next(action);
}

const store = createStore(
    reducers.calendarReducer,
    initialState,
    applyMiddleware(validatorMiddleware)
);

export default store;