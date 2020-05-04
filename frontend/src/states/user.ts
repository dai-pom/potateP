import { reducerWithInitialState } from "typescript-fsa-reducers";
import { userActions } from "../actions/user";

export interface UserState {
  name: string;
  email: string;
  uid: string;
  description: string;
  isLogin: boolean;
}

export const userInitialState: UserState = {
  name: "",
  uid: "",
  email: "",
  isLogin: false,
  description: "",
};
export const userReducer = reducerWithInitialState(userInitialState)
  .case(userActions.setUser, (state, user) => {
    return user;
  })
  .case(userActions.registerUser, (state, user) => {
    return user;
  });

export const searchedUserReducer = reducerWithInitialState(
  userInitialState
).case(userActions.setSearchUser, (state, user) => {
  return user;
});
