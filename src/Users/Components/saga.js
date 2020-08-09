import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from "./action"
import { getAllApi } from "./api"

function* getData() {
  const response = yield call(getAllApi)
  yield put(actions.getDashboardData.success(response))
}

export default function* watchSaga() {
  yield takeEvery(actions.getDashboardData.REQUEST, getData)
}