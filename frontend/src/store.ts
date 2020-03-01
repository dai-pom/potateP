import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import rootSaga from "./sagas/saga";
import createSagaMiddleware from "redux-saga";
import { userReducer, UserState } from "./states/user";
import persistState from "redux-localstorage";

export type AppState = {
  user: UserState;
};
const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const slicer = () => (state: AppState) => ({
  user: {
    uid: state.user.uid,
    isLogin: state.user.isLogin
  }
});
const store = createStore(
  combineReducers<AppState>({
    user: userReducer
  }),
  storeEnhancers(
    applyMiddleware(sagaMiddleware),
    persistState(undefined, "test", slicer)
  )
);
// sagaMiddleware.run(rootSaga);
export default store;
