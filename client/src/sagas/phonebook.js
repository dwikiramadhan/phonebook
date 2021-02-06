import { all, takeEvery, put, call } from 'redux-saga/effects';
import client from '../actions/connect';
import * as actions from '../actions';
import gql from 'graphql-tag';

const read = async (params) => {
    const phonebooksQuery = gql`
        query($offset: Int!, $limit: Int!, $searchName: String!, $searchPhone: String!) {
            phonebooks(pagination: {offset: $offset, limit: $limit, searchName: $searchName, searchPhone: $searchPhone}) {
                items {
                  id
                  name
                  phone
                }
                count
            }
        }`;
    return await client.query({
        query: phonebooksQuery,
        variables: {
            offset: params.offset,
            limit: params.limit,
            searchName: params.searchName,
            searchPhone: params.searchPhone
        }
    })
        .then(response => response.data.phonebooks)
        .catch(err => {
            throw err
        });
}

const add = async (params) => {
    const addQuery = gql`
        mutation addContact($_id: ID!, $id: ID!, $name: String!, $phone: String!) {
            addContact(_id: $_id, id: $id, name: $name, phone: $phone) {
                _id
                id
                name
                phone
            }
        }`;
    return await client.mutate({
        mutation: addQuery,
        variables: {
            _id: params.id,
            id: params.id,
            name: params.name,
            phone: params.phone
        }
    })
        .then(response => response.data)
        .catch(err => {
            throw err
        });
}

// const checkData = async (path, params) =>
//     await request.post(path, params)
//         .then(response => response.data)
//         .catch(err => {
//             throw err
//         });

const renew = async (params) => {
    const updateQuery = gql`
        mutation updateContact($_id: ID!, $name: String!, $phone: String!) {
            updateContact(_id: $_id, name: $name, phone: $phone) {
                _id
                name
                phone
            }
        }`;
    return await client.mutate({
        mutation: updateQuery,
        variables: {
            _id: params.id,
            name: params.name,
            phone: params.phone
        }
    })
        .then(response => response.data)
        .catch(err => {
            throw err
        });
}

const remove = async (params) => {
    const deleteQuery = gql`
        mutation removeContact($_id: ID!) {
            removeContact(_id: $_id) {
                _id
            }
        }`;
    return await client.mutate({
        mutation: deleteQuery,
        variables: {
            _id: params.id
        }
    })
        .then(response => response.data)
        .catch(err => {
            throw err
        });
}
// const PATH = '/api/phonebooks'

//load
function* loadData(payload) {
    const { curpage, limit, searchName, searchPhone } = payload;
    const offset = curpage ? ((curpage - 1) * limit + 1) : 1;
    try {
        const data = yield call(read, { offset, limit, searchName, searchPhone });
        yield put(actions.loadDataSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.loadDataFailure());
    }
}

function* postData(payload) {
    const { name, phone } = payload;
    const id = Date.now();
    try {
        const data = yield call(add, { id, name, phone })
        yield put(actions.addDataView(id, name, phone));
        yield put(actions.addDataSuccess(data))
    } catch (error) {
        yield put(actions.addDataView(id, name, phone));
        yield put(actions.addDataFailure(id))
    }
}

function* updateData(payload) {
    const { id, name, phone } = payload;
    yield put(actions.updateDataView(id, name, phone));
    try {
        const data = yield call(renew, { id, name, phone })
        yield put(actions.updateDataSuccess(data))
    } catch (error) {
        yield put(actions.updateDataFailure(id))
    }
}

function* deleteData(payload) {
    const { id } = payload;
    yield put(actions.deleteDataView(id));
    try {
        yield call(remove, { id })
        yield put(actions.deleteDataSuccess())
    } catch (error) {
        yield put(actions.deleteDataFailure())
    }
}

function* resendData(payload) {
    const { id, name, phone } = payload;
    try {
        const data = yield call(add, { id, name, phone })
        yield put(actions.addDataSuccess(data))
    } catch (error) {
        yield put(actions.addDataFailure(id))
    }
}


export default function* rootSaga() {
    yield all([
        takeEvery('LOAD_DATA', loadData),
        takeEvery('POST_DATA', postData),
        takeEvery('RENEW_DATA', updateData),
        takeEvery('REMOVE_DATA', deleteData),
        takeEvery('RESEND_DATA', resendData),
    ])
}