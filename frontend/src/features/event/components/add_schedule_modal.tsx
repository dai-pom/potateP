import * as React from "react";
import moment from "moment";
import {
  Modal,
  ModalBody,
  Button,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Container,
} from "reactstrap";
import { Action } from "typescript-fsa";
import { ScheduleState } from "../../../states/event/schedule";
import { scheduleAction } from "../../../actions/event/schedule";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../../store";

interface ScheduleActions {
  addSchedule: (v: ScheduleState) => Action<ScheduleState>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<ScheduleState>>) => ({
  addSchedule: (v: ScheduleState) => dispatch(scheduleAction.addSchedule(v)),
});
const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

interface OwnProps {
  toggle: () => void;
  isOpen: boolean;
  nowSchedules: ScheduleState[];
  eid: string;
  date: moment.Moment;
}
interface formProps {
  title: string;
  description: string;
  sh: number;
  sm: number;
  eh: number;
  em: number;
}
const initialValues = {
  title: "",
  description: "",
  sh: 0,
  sm: 0,
  eh: 0,
  em: 0,
};
const AddScheduleModal: React.FC<
  ScheduleActions & OwnProps & Pick<AppState, "user">
> = (props) => {
  const [start, setStart] = React.useState(moment("00:00", "hh:mm"));
  const [end, setEnd] = React.useState(moment("00:00", "hh:mm"));
  const [err, setErr] = React.useState("");
  const [errDetail, setErrDetail] = React.useState("");

  const handleOnSubmit = (values: formProps) => {
    const newSchedule: ScheduleState = {
      Eid: Number(props.eid),
      Date: props.date,
      Title: values.title,
      Description: values.description,
      Start: start,
      End: end,
      Color: "pink",
      UserName: props.user.name,
    };
    props.addSchedule(newSchedule);
    props.toggle();
  };
  const hourSelectoer = () => {
    const list = [];
    for (var i = 0; i < 24; i++) {
      list.push(<option>{i}</option>);
    }
    return list;
  };
  const minuteSelectoer = () => {
    const list = [];
    for (var i = 0; i < 56; i = i + 5) {
      list.push(<option>{i}</option>);
    }
    return list;
  };
  const validateDate = (start: moment.Moment, end: moment.Moment) => {
    console.log("validate");
    console.log(start.format("HH:mm"));
    console.log(end.format("HH:mm"));
    if (start.isSameOrAfter(end)) {
      setErr("終了時刻は開始時刻よりも後の時刻を指定してください。");
      return;
    }
    if (
      !props.nowSchedules.every((schedule) => {
        if (
          start.isBetween(schedule.Start, schedule.End, "minute", "[)") ||
          moment(schedule.Start).isBetween(start, end, "minute", "[)")
          // end.isBetween(schedule.start, schedule.end, "minute", "(]")
        ) {
          setErr("指定された時刻にはすでに予定が入っています");
          setErrDetail(
            `予定名：${schedule.Title} 時間：${moment(schedule.Start).format(
              "HH:mm"
            )}～${moment(schedule.End).format("HH:mm")}`
          );
          return false;
        }
        return true;
      })
    ) {
      return;
    }
    setErr("");
    setErrDetail("");
  };
  return (
    <Modal isOpen={props.isOpen} size="lg">
      <ModalHeader>新規スケジュールの追加</ModalHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
        })}
        onSubmit={(values) => handleOnSubmit(values)}
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <Form onSubmit={() => handleOnSubmit(values)}>
              <ModalBody>
                <Container fluid={true}>
                  <FormGroup>
                    <Label>タイトル</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={values.title}
                      invalid={touched.title && errors.title ? true : false}
                      required={true}
                      onChange={handleChange}
                    />
                    <FormFeedback>{errors.title}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>説明</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      value={values.description}
                      invalid={
                        touched.description && errors.description ? true : false
                      }
                      onChange={handleChange}
                    />
                    <FormFeedback>{errors.description}</FormFeedback>
                  </FormGroup>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>開始時刻</Label>
                        <Row noGutters>
                          <Col sm="5">
                            <Input
                              type="select"
                              name="sh"
                              id="sh"
                              value={values.sh}
                              invalid={err ? true : false}
                              onChange={(e) => {
                                setStart(() => {
                                  const newState = moment(
                                    `${e.currentTarget.value}:${values.sm}`,
                                    "HH:mm"
                                  );
                                  validateDate(newState, end);
                                  return newState;
                                });
                                setFieldValue(
                                  "sh",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {hourSelectoer()}
                            </Input>
                          </Col>
                          {" 時 "}
                          <Col sm="5">
                            <Input
                              type="select"
                              name="sm"
                              id="sm"
                              value={values.sm}
                              invalid={err ? true : false}
                              onChange={(e) => {
                                setStart(() => {
                                  const newState = moment(
                                    `${values.sh}:${e.currentTarget.value}`,
                                    "HH:mm"
                                  );
                                  validateDate(newState, end);
                                  return newState;
                                });
                                setFieldValue(
                                  "sm",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {minuteSelectoer()}
                            </Input>
                          </Col>
                          {" 分 "}
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>終了時刻</Label>
                        <Row noGutters>
                          <Col sm="5">
                            <Input
                              type="select"
                              name="eh"
                              id="eh"
                              value={values.eh}
                              invalid={err ? true : false}
                              onChange={(e) => {
                                setEnd(() => {
                                  const newState = moment(
                                    `${e.currentTarget.value}:${values.em}`,
                                    "HH:mm"
                                  );
                                  validateDate(start, newState);
                                  return newState;
                                });
                                setFieldValue(
                                  "eh",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {hourSelectoer()}
                            </Input>
                          </Col>
                          {" 時 "}
                          <Col sm="5">
                            <Input
                              type="select"
                              name="em"
                              id="em"
                              value={values.em}
                              invalid={err ? true : false}
                              onChange={(e) => {
                                setEnd(() => {
                                  const newState = moment(
                                    `${values.eh}:${e.currentTarget.value}`,
                                    "HH:mm"
                                  );
                                  validateDate(start, newState);
                                  return newState;
                                });
                                setFieldValue(
                                  "em",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {minuteSelectoer()}
                            </Input>
                          </Col>
                          {"分"}
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <span style={{ color: "red" }}>{err}</span>
                    </Col>
                    <Col sm={12}>
                      <span style={{ color: "red" }}>{errDetail}</span>
                    </Col>
                  </Row>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => handleOnSubmit(values)}>
                  作成
                </Button>
                <Button onClick={() => props.toggle()}>キャンセル</Button>
              </ModalFooter>
            </Form>
          </>
        )}
      />
    </Modal>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleModal);
