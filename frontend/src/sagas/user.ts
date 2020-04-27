import {
  all,
  call,
  put,
  select,
  takeEvery,
  take,
  takeLatest,
} from "redux-saga/effects";

import { Action } from "typescript-fsa";
import { registerUser } from "../api";
import { userActions } from "../actions/user";
import { AxiosResponse } from "axios";

export function* register(action: ReturnType<typeof userActions.setUser>) {
  const apiResult: AxiosResponse<any> = yield call(
    registerUser,
    action.payload
  );
  console.log(apiResult.statusText);
  //if (apiResult.data) {
  //  yield put(userActions.setUser(apiResult.data.todo_list))
  //}
}
