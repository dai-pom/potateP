import { reducerWithInitialState } from "typescript-fsa-reducers";
import { userActions } from "../actions/user";

export interface UserState {
  name: string;
  email: string;
  uid: string;
  description: string;
  isLogin: boolean;
}

const initialState: UserState = {
  name: "",
  uid: "",
  email: "",
  isLogin: false,
  description: "",
};
export const userReducer = reducerWithInitialState(initialState)
  .case(userActions.setUser, (state, user) => {
    return user;
  })
  .case(userActions.registerUser, (state, user) => {
    return user;
  });
