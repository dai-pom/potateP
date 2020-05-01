import { takeEvery, takeLatest, call, select, put } from "redux-saga/effects";
import { eventActions } from "../actions/event/event";
import { addEventApi, fetchEventApi } from "../api/event";
import { AxiosResponse } from "axios";
import { AppState } from "../store";
import moment from "moment";
import { errorActions } from "../actions/error";
import { ApiResponse } from "../api/api";
import { userActions } from "../actions/user";
export function* eventRoot() {
  yield takeEvery("ADD_EVENT", addEvent);
  yield takeEvery("FETCH_EVENT", fetchEvents);
}
export function* fetchEvents(
  action: ReturnType<typeof eventActions.fetchEvents>
) {
  const apiresult: ApiResponse = yield call(fetchEventApi, action.payload);
  if (apiresult.isSuccess && apiresult.response.data != null) {
    const events = apiresult.response.data.map((event: any) => {
      event.StartDate = moment(event.StartDate);
      event.EndDate = moment(event.EndDate);
      return event;
    });
    yield put(eventActions.setEvents(events));
  } else if (apiresult.isSuccess) {
    yield put(eventActions.setEvents([]));
  } else {
    yield put(eventActions.setEvents([]));
    yield put(errorActions.setError({ code: apiresult.error.status }));
  }
}

export function* addEvent(action: ReturnType<typeof eventActions.addEvents>) {
  const apiResult: AxiosResponse<any> = yield call(addEventApi, action.payload);
  console.log(apiResult.data);
  const state: AppState = yield select();
  const events = state.events;
  apiResult.data.StartDate = moment(apiResult.data.StartDate);
  apiResult.data.EndDate = moment(apiResult.data.EndDate);
  const newEvents = events.concat(apiResult.data);
  yield put(eventActions.setEvents(newEvents));
}
