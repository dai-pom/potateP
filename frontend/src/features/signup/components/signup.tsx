import * as React from "react";
import { RouteComponentProps } from "react-router";
import { userActions } from "../containers/signup";
import { AppState } from "../../../store";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  FormFeedback
} from "reactstrap";
import firebase from "../../../FireBase";
interface OwnProps {}

type SignUpProps = OwnProps & userActions & AppState & RouteComponentProps;

interface OwnState {
  name: string;
  password: string;
}

export class SignUp extends React.Component<SignUpProps, OwnState> {
  handleOnSubmit = (values: any) => {
    console.log("submit");
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(res => {
        console.log(res);
        this.props.setUser({
          name: values.email,
          isLogin: true,
          uid: "",
          description:""
        });
        this.props.history.push("/home");
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };
  render() {
    return (
      <Container>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => this.handleOnSubmit(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string().required()
          })}
          render={({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={{ size: 6, offset: 3 }}>
                  <p style={{ textAlign: "center" }}>新規登録</p>
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
                    <Button color="success" type="submit" disabled={false}>
                      新規登録
                    </Button>
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
