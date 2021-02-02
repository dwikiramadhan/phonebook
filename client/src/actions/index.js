//add user 
export const addDataSuccess = (data) => ({
    type: 'ADD_DATA_SUCCESS',
    data
})

export const addDataFailure = (id) => ({
    type: 'ADD_DATA_FAILURE',
    id
})

export const addDataView = (id, name, phone) => ({
    type: 'ADD_DATA',
    id, name, phone
})
export const addDataExists = (phone) => ({
    type: 'ADD_DATA_EXISTS',
    phone
})

export const addData = (name, phone) => ({
    type: 'POST_DATA',
    name, phone   
})
//end add user

//load data 
export const loadDataSuccess = (data) => ({
    type: 'LOAD_DATA_SUCCESS',
    data
})

export const loadDataFailure = () => ({
    type: 'LOAD_DATA_FAILURE'
})

export const loadData = () => ({
    type: 'LOAD_DATA'
})
//end load data

//delete data 
export const deleteDataSuccess = () => ({
    type: 'DELETE_DATA_SUCCESS'
})

export const deleteDataFailure = () => ({
    type: 'DELETE_DATA_FAILURE'
})

export const deleteDataView = (id) => ({
    type: 'DELETE_DATA',
    id
})

export const deleteData = (id) => ({
    type: 'REMOVE_DATA',
    id
})
//end delete data

//Edit data 
export const updateDataSuccess = (data) => ({
    type: 'UPDATE_DATA_SUCCESS',
    data
})

export const updateDataFailure = (id) => ({
    type: 'UPDATE_DATA_FAILURE',
    id
})

export const updateDataView = (id, name, phone) => ({
    type: 'UPDATE_DATA',
    id, name, phone
})

export const updateData = (id, name, phone) => ({
    type: 'RENEW_DATA',
    id, name, phone
})
//end update data

//resend message 
export const resendData = (id, name, phone) => ({
    type: 'RESEND_DATA',
    id, name, phone
});
//end resend message