import { userRoot, searchUser } from "./user";
import {
  eventRoot,
  addEvent,
  fetchEvents,
  fetchMember,
  addMember,
} from "./event";
import { takeLatest, takeEvery, call } from "redux-saga/effects";
import { fetchSchedule, addSchedule, deleteSchedule } from "./schedule";
export default function* rootSaga() {
  yield takeEvery("ADD_EVENT", addEvent);
  yield takeEvery("FETCH_EVENTS", fetchEvents);
  yield takeEvery("ADD_SCHEDULE", addSchedule);
  yield takeEvery("FETCH_SCHEDULE", fetchSchedule);
  yield takeEvery("DELETE_SCHEDULE", deleteSchedule);
  yield takeEvery("FETCH_MEMBER", fetchMember);
  yield takeEvery("FETCH_SEARCH_USER", searchUser);
  yield takeEvery("ADD_MEMBER", addMember);
  yield userRoot();
  yield eventRoot();
}
