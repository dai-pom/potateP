import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rootSaga from "./sagas/root";
import createSagaMiddleware from "redux-saga";
import { userReducer, UserState } from "./states/user";
import persistState from "redux-localstorage";
import { scheduleReducer, ScheduleState } from "./states/event/schedule";
import { EventState, eventReducer } from "./states/event/event";
import { ErrorState, errorReducer } from "./states/error";

export type AppState = {
  user: UserState;
  schedule: ScheduleState[];
  events: EventState[];
  error: ErrorState;
};
const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const slicer = () => (state: AppState) => ({
  user: {
    uid: state.user.uid,
    isLogin: state.user.isLogin,
  },
});
const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return combineReducers<AppState>({
    user: userReducer,
    schedule: scheduleReducer,
    events: eventReducer,
    error: errorReducer,
  })(state, action);
};
const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(sagaMiddleware),
    persistState(undefined, "test", slicer)
  )
);
// const store = createStore(
//   combineReducers<AppState>({
//     user: userReducer,
//     schedule: scheduleReducer,
//   }),
//   storeEnhancers(
//     applyMiddleware(sagaMiddleware),
//     persistState(undefined, "test", slicer)
//   )
// );
sagaMiddleware.run(rootSaga);
export default store;
