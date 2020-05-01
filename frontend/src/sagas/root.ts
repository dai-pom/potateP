import { userRoot } from "./user";
import { eventRoot, addEvent, fetchEvents } from "./event";
import { takeLatest, takeEvery, call } from "redux-saga/effects";
import { fetchSchedule, addSchedule, deleteSchedule } from "./schedule";
export default function* rootSaga() {
  yield takeEvery("ADD_EVENT", addEvent);
  yield takeEvery("FETCH_EVENTS", fetchEvents);
  yield takeEvery("ADD_SCHEDULE", addSchedule);
  yield takeEvery("FETCH_SCHEDULE", fetchSchedule);
  yield takeEvery("DELETE_SCHEDULE", deleteSchedule);
  yield userRoot();
  yield eventRoot();
}
