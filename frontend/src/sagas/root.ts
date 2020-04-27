import {
all,call,put,select,takeEvery,take,takeLatest
} from "redux-saga/effects"
import {register} from "./user"
export default function* rootSaga() {
  // yield takeLatest("ACTIONS_UPDATE_NAME", register)
  yield takeLatest("REGISTER_USER", register)
  // yield takeLatest("ACTIONS_UPDATE_TODOLIST", postTodo)
}
