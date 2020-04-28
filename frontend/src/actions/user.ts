import actionCreatorFactory from "typescript-fsa";
import { UserState } from "../states/user";

const actionCreator = actionCreatorFactory();
export const userActions = {
  setUser: actionCreator<UserState>("ACTIONS_UPDATE_NAME"),
  registerUser: actionCreator<UserState>("REGISTER_USER"),
  fetchUser: actionCreator<string>("FETCH_USER"),
  logout: actionCreator("RESET_STATE"),
};
