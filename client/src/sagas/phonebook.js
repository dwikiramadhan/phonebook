import { all, takeEvery, put, call } from 'redux-saga/effects';
import request from '../actions/connect';
import * as actions from '../actions';

const read = async (path) =>
    await request.get(path)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const add = async (path, params) =>
    await request.post(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const checkData = async (path, params) =>
    await request.post(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const renew = async (path, params) =>
    await request.put(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const remove = async (path, params) =>
    await request.delete(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const PATH = '/api/phonebooks'

//add
function* loadData() {
    try {
        const data = yield call(read, PATH);
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
        const check = yield call(checkData, '/api/checkdata', { phone })
        if (check) {
            yield put(actions.addDataExists(phone))
        }else{
            yield put(actions.addDataView(id, name, phone));
            const data = yield call(add, PATH, { id, name, phone })
            yield put(actions.addDataSuccess(data))
        }
    } catch (error) {
        yield put(actions.addDataView(id, name, phone));
        yield put(actions.addDataFailure(id))
    }
}

function* updateData(payload) {
    const { id, name, phone } = payload;
    yield put(actions.updateDataView(id, name, phone));
    try {
        const data = yield call(renew, `${PATH}/${id}`, { id, name, phone })
        yield put(actions.updateDataSuccess(data))
    } catch (error) {
        yield put(actions.updateDataFailure(id))
    }
}

function* deleteData(payload) {
    const { id } = payload;
    console.log(id)
    yield put(actions.deleteDataView(id));
    try {
        yield call(remove, `${PATH}/${id}`)
        yield put(actions.deleteDataSuccess())
    } catch (error) {
        yield put(actions.deleteDataFailure())
    }
}

function* resendData(payload) {
    const { id, name, phone } = payload;
    try {
        const data = yield call(add, PATH, { id, name, phone })
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