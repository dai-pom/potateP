import {
  all,
  call,
  put,
  select,
  takeEvery,
  take,
  takeLatest,
} from "redux-saga/effects";

import { registerUser, fetchUserDetail, searchUserApi } from "../api/user";
import { userActions } from "../actions/user";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../api/api";
import { userInitialState } from "../states/user";
export function* userRoot() {
  yield takeEvery("REGISTER_USER", register);
  yield takeEvery("FETCH_USER", fetchUser);
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
export function* searchUser(
  action: ReturnType<typeof userActions.fetchSearchUser>
) {
  const apiResult: ApiResponse = yield call(searchUserApi, action.payload);
  if (apiResult.isSuccess) {
    console.log("seikou");
    yield put(
      userActions.setSearchUser({
        email: apiResult.response.data.Email,
        name: apiResult.response.data.Name,
        isLogin: false,
        uid: apiResult.response.data.Id,
        description: apiResult.response.data.Description,
      })
    );
  } else {
    console.log("sippai");
    yield put(userActions.setSearchUser(userInitialState));
  }
}
export function* register(action: ReturnType<typeof userActions.setUser>) {
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
