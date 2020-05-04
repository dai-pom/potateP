import { takeEvery, takeLatest, call, select, put } from "redux-saga/effects";
import { eventActions } from "../actions/event/event";
import {
  addEventApi,
  fetchEventApi,
  fetchMemberApi,
  addMemberApi,
} from "../api/event";
import { AxiosResponse } from "axios";
import { AppState } from "../store";
import moment from "moment";
import { errorActions } from "../actions/error";
import { ApiResponse } from "../api/api";
import { userActions } from "../actions/user";
import { fetchUserDetail } from "../api/user";
import { UserState } from "../states/user";
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
export function* fetchMember(
  action: ReturnType<typeof eventActions.fetchMember>
) {
  const apiresult: ApiResponse = yield call(fetchMemberApi, action.payload);
  if (apiresult.isSuccess && apiresult.response.data != null) {
    const memberList: UserState[] = [];
    for (let i = 0; i < apiresult.response.data.length; i++) {
      const memberDetail: AxiosResponse<any> = yield call(
        fetchUserDetail,
        apiresult.response.data[i]
      );
      if (memberDetail.data != null) {
        memberList.push({
          name: memberDetail.data.Name,
          email: memberDetail.data.Email,
          isLogin: false,
          uid: memberDetail.data.Id,
          description: memberDetail.data.Description,
        });
      }
    }
    yield put(eventActions.setMember(memberList));
  } else if (apiresult.isSuccess) {
    yield put(eventActions.setMember([]));
  } else {
    yield put(eventActions.setMember([]));
    yield put(errorActions.setError({ code: apiresult.error.status }));
  }
}

export function* addMember(action: ReturnType<typeof eventActions.addMember>) {
  const apiresult: ApiResponse = yield call(addMemberApi, action.payload);
  if (apiresult.isSuccess) {
    const state: AppState = yield select();
    const newMember = state.member.concat(state.searchedUser);
    yield put(eventActions.setMember(newMember));
  }
}
