import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./store";
import { withRouter, RouteComponentProps } from "react-router";
// import LoadingOverlay from "react-loading-overlay";

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user
});
interface OwnProps {}
type AuthProps = OwnProps & RouteComponentProps & Pick<AppState, "user">;
export class Auth extends React.Component<AuthProps> {
  render() {
    if (this.props.user.isLogin) {
      return this.props.children;
    } else {
      return <Redirect to={"/"} />;
    }
  }
}
export default withRouter(connect(mapStateToProps)(Auth));
