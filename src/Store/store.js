// store.js
import { createStore, combineReducers } from 'redux';
import patientsReducer from '../Reducers/patientsListReducers';

const rootReducer = combineReducers({
    patients: patientsReducer
    // Add more reducers if needed
});

const store = createStore(rootReducer);

export default store;
