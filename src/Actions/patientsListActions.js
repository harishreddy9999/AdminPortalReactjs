// actions/patientsActions.js
export const updatePatientsPage = (page) => ({
    type: 'UPDATE_PATIENTS_PAGE',
    payload: page
});

export const updatePatientsRowsPerPage = (rowsPerPage) => ({
    type: 'UPDATE_PATIENTS_ROWS_PER_PAGE',
    payload: rowsPerPage
});

export const updatePatientsSearchText = (searchText) => ({
    type: 'UPDATE_PATIENTS_SEARCH_TEXT',
    payload: searchText
});
