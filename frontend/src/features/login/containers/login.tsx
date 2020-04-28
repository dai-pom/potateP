import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { userActions } from "../../../actions/user";
import { Login } from "../components/login";
import { withRouter } from "react-router";
import { UserState } from "../../../states/user";

export interface userActions {
  setUser: (v: UserState) => Action<UserState>;
  registerUser: (v: UserState) => Action<UserState>;
  fetchUser: (v: string) => Action<string>;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<UserState | string>>
) => ({
  setUser: (v: UserState) => dispatch(userActions.setUser(v)),
  registerUser: (v: UserState) => dispatch(userActions.registerUser(v)),
  fetchUser: (v: string) => dispatch(userActions.fetchUser(v)),
});

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
