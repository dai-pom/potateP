import { userRoot } from "./user";
import { eventRoot, addEvent, fetchEvents } from "./event";
import { takeLatest, call } from "redux-saga/effects";
export default function* rootSaga() {
  yield takeLatest("ADD_EVENT", addEvent);
  yield takeLatest("FETCH_EVENTS", fetchEvents);
  yield userRoot();
  yield eventRoot();
}
