import React from "react";
import { Dispatch } from "redux";
import { AppState } from "./store";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ErrorState } from "./states/error";
import { Action } from "typescript-fsa";
import { errorActions } from "./actions/error";
import { userActions } from "./actions/user";

interface ErrorPageProps {
  setError: (v: ErrorState) => Action<ErrorState>;
  logout: () => Action<void>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<ErrorState | void>>) => ({
  setError: (v: ErrorState) => dispatch(errorActions.setError(v)),
  logout: () => dispatch(userActions.logout()),
});
const mapStateToProps = (AppState: AppState) => ({
  error: AppState.error,
});
type ErrorProps = ErrorPageProps &
  RouteComponentProps &
  Pick<AppState, "error"> & {
    children: React.ReactNode;
  };

const CheckError: React.FC<ErrorProps> = (props) => {
  const goLogin = () => {
    props.setError({ code: NaN });
    props.history.push("/");
  };
  const page = () => {
    if (props.error.code == 403) {
      props.logout();
      return <ErrorPage403 callback={goLogin} />;
    } else {
      return props.children;
    }
  };
  return <>{page()}</>;
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckError)
);

interface OwnProps {
  callback: () => void;
}
const ErrorPage403: React.FC<OwnProps> = (props) => {
  return (
    <Container>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Container>
            <Row>
              <Col style={{ alignItems: "center" }}>
                <h1>403 認証失敗</h1>
              </Col>
            </Row>
            <Row>
              <Col style={{ alignItems: "center" }}>
                <a onClick={() => props.callback()}>ログイン画面に戻る</a>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
