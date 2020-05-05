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
  const goHome = () => {
    props.setError({ code: NaN });
    props.history.push("/home");
  };
  const page = () => {
    if (props.error.code == 403) {
      props.logout();
      return (
        <ErrorPage
          callback={goLogin}
          statusCode={403}
          message="認証失敗"
          operationMessage="ログイン画面に戻る"
        />
      );
    } else if (props.error.code == 400) {
      return (
        <ErrorPage
          callback={goHome}
          statusCode={400}
          message="指定のコンテンツにアクセスする権限が無いか、コンテンツが存在しません"
          operationMessage="ホームに戻る"
        />
      );
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
  statusCode: number;
  message: string;
  operationMessage: string;
}
const ErrorPage: React.FC<OwnProps> = (props) => {
  return (
    <Container>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Container>
            <Row>
              <Col style={{ alignItems: "center" }}>
                <h1>
                  {props.statusCode}：{props.message}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col style={{ alignItems: "center" }}>
                <a onClick={() => props.callback()}>{props.operationMessage}</a>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
