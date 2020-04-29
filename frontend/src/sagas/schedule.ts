import { scheduleAction } from "../actions/event/schedule";
import { AxiosResponse } from "axios";
import { ScheduleState } from "../states/event/schedule";
import { addScheduleApi, fetchScheduleApi } from "../api/schedule";
import { takeEvery, takeLatest, call, select, put } from "redux-saga/effects";
import { AppState } from "../store";
import moment from "moment";

export function* fetchSchedule(
  action: ReturnType<typeof scheduleAction.fetchSchedule>
) {
  const apiresult: AxiosResponse<any> = yield call(
    fetchScheduleApi,
    action.payload
  );
  if (apiresult.data != null) {
    const schedule = apiresult.data.map((schedule: any) => {
      schedule.Date = moment(schedule.Date, "YYYY-MM-DD");
      schedule.Start = moment(schedule.Start, "HH:mm");
      schedule.End = moment(schedule.End, "HH:mm");
      return schedule;
    });
    yield put(scheduleAction.setSchedule(schedule));
  } else {
    yield put(scheduleAction.setSchedule([]));
  }
}
export function* addSchedule(
  action: ReturnType<typeof scheduleAction.addSchedule>
) {
  const apiresult: AxiosResponse<ScheduleState> = yield call(
    addScheduleApi,
    action.payload
  );
  if (apiresult.status === 200) {
    const state: AppState = yield select();
    const schedule = state.schedule;
    schedule.push(action.payload);
    yield put(scheduleAction.setSchedule(schedule));
  }
}
