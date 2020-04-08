import { reducerWithInitialState } from "typescript-fsa-reducers";
import { userActions } from "../actions/user";

export interface UserState {
  email: string;
  uid: string;
  isLogin: boolean;
}

const initialState: UserState = {
  email: "",
  uid: "",
  isLogin: false
};

export const userReducer = reducerWithInitialState(initialState).case(
  userActions.setUser,
  (state, user) => {
    return user;
  }
);
