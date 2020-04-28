import { takeLatest, call, select, put } from "redux-saga/effects";
import { eventActions } from "../actions/event/event";
import { addEventApi, fetchEventApi } from "../api/event";
import { AxiosResponse } from "axios";
import { AppState } from "../store";
export function* eventRoot() {
  yield takeLatest("ADD_EVENT", addEvent);
  yield takeLatest("FETCH_EVENT", fetchEvents);
}
export function* fetchEvents(
  action: ReturnType<typeof eventActions.fetchEvents>
) {
  const apiresult: AxiosResponse<any> = yield call(
    fetchEventApi,
    action.payload
  );
  if (apiresult.data != null) {
    yield put(eventActions.setEvents(apiresult.data));
  } else {
    yield put(eventActions.setEvents([]));
  }
}

export function* addEvent(action: ReturnType<typeof eventActions.addEvents>) {
  const apiResult: AxiosResponse<any> = yield call(addEventApi, action.payload);
  console.log(apiResult.data);
  const state: AppState = yield select();
  const events = state.events;
  events.push(apiResult.data);
  yield put(eventActions.setEvents(events));
}
