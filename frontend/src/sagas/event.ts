import { takeEvery, takeLatest, call, select, put } from "redux-saga/effects";
import { eventActions } from "../actions/event/event";
import { addEventApi, fetchEventApi } from "../api/event";
import { AxiosResponse } from "axios";
import { AppState } from "../store";
import moment from "moment";
export function* eventRoot() {
  yield takeEvery("ADD_EVENT", addEvent);
  yield takeEvery("FETCH_EVENT", fetchEvents);
}
export function* fetchEvents(
  action: ReturnType<typeof eventActions.fetchEvents>
) {
  const apiresult: AxiosResponse<any> = yield call(
    fetchEventApi,
    action.payload
  );
  if (apiresult.data != null) {
    const events = apiresult.data.map((event: any) => {
      event.StartDate = moment(event.StartDate);
      event.EndDate = moment(event.EndDate);
      return event;
    });
    yield put(eventActions.setEvents(events));
  } else {
    yield put(eventActions.setEvents([]));
  }
}

export function* addEvent(action: ReturnType<typeof eventActions.addEvents>) {
  const apiResult: AxiosResponse<any> = yield call(addEventApi, action.payload);
  console.log(apiResult.data);
  const state: AppState = yield select();
  const events = state.events;
  apiResult.data.StartDate = moment(apiResult.data.StartDate);
  apiResult.data.EndDate = moment(apiResult.data.EndDate);
  events.push(apiResult.data);
  yield put(eventActions.setEvents(events));
}
