import { Formik } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import firebase from "../../../FireBase";
import { AppState } from "../../../store";
import { userActions } from "../containers/login";
import { Link } from "react-router-dom";
interface OwnProps {}

type LoginProps = OwnProps & userActions & AppState & RouteComponentProps;

interface OwnState {
  name: string;
  password: string;
}

export class Login extends React.Component<LoginProps, OwnState> {
  handleOnSubmit = (values: any) => {
    console.log("submit");
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        console.log(res);
        this.props.setUser({
          name: values.email,
          isLogin: true,
          uid: res.user?.uid || "",
          description: "",
        });
        this.props.history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  skip = () => {
    this.props.setUser({
      name: "",
      isLogin: true,
      uid: "",
      description: "",
    });
    this.props.history.push("/home");
  };
  handleGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        res.user?.getIdToken().then((idToken) => {
          localStorage.setItem("jwt", idToken.toString());
          this.props.setUser({
            name: res.user?.email || "",
            isLogin: true,
            uid: res.user?.uid || "",
            description: "",
          });
          this.props.registerUser({
            name: res.user?.email || "",
            isLogin: true,
            uid: res.user?.uid || "",
            description: "",
          });
        });
        this.props.history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  render() {
    return (
      <Container>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => this.handleOnSubmit(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
          render={({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={{ size: 6, offset: 3 }}>
                  <p style={{ textAlign: "center" }}>ログイン</p>
                  <FormGroup>
                    <Label for="name">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.email && errors.email ? true : false}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        touched.password && errors.password ? true : false
                      }
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 6, offset: 3 }}>
                  <div style={{ textAlign: "center" }}>
                    <Row>
                      <Col md={{ size: 6 }}>
                        <Button color="success" type="submit" disabled={false}>
                          ログイン
                        </Button>
                      </Col>
                      <Col md={{ size: 6 }}>
                        <Link to="/signup">新規登録</Link>
                      </Col>
                    </Row>
                    <p>or</p>
                    <Button onClick={this.handleGoogle}>Googleログイン</Button>
                    <Row>
                      <Button onClick={this.skip}>skip</Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        />
      </Container>
    );
  }
}
