// reducers/patientsReducer.js
const initialState = {
    page: 0,
    rowsPerPage: 50,
    searchText: ''
};

const patientsReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case 'UPDATE_PATIENTS_PAGE':
            return {
                ...state,
                page: action.payload
            };
        case 'UPDATE_PATIENTS_ROWS_PER_PAGE':
            return {
                ...state,
                rowsPerPage: action.payload
            };
        case 'UPDATE_PATIENTS_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload
            };
        default:
            return state;
    }
};

export default patientsReducer;
