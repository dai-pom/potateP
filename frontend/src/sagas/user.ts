import {
  all,
  call,
  put,
  select,
  takeEvery,
  take,
  takeLatest,
} from "redux-saga/effects";

import { registerUser, fetchUserDetail } from "../api/user";
import { userActions } from "../actions/user";
import { AxiosResponse } from "axios";
export function* userRoot() {
  yield takeLatest("REGISTER_USER", register);
  yield takeLatest("FETCH_USER", fetchUser);
}
export function* fetchUser(action: ReturnType<typeof userActions.fetchUser>) {
  const apiResult: AxiosResponse<any> = yield call(
    fetchUserDetail,
    action.payload
  );
  yield put(
    userActions.setUser({
      name: apiResult.data.Name,
      email: apiResult.data.Email,
      isLogin: true,
      uid: apiResult.data.Id,
      description: apiResult.data.Description,
    })
  );
}
export function* register(action: ReturnType<typeof userActions.setUser>) {
  console.log("usersaga");
  const apiResult: AxiosResponse<any> = yield call(
    registerUser,
    action.payload
  );
  yield put(
    userActions.setUser({
      name: apiResult.data.Name,
      email: apiResult.data.Email,
      isLogin: true,
      uid: apiResult.data.Id,
      description: apiResult.data.Description,
    })
  );
}
