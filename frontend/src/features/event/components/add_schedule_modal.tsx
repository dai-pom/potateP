import * as React from "react";
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
  Container
} from "reactstrap";
import { Action } from "typescript-fsa";
import { ScheduleState } from "../../../states/event/schedule";
import { scheduleAction } from "../../../actions/event/schedule";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface ScheduleActions {
  setSchedule: (v: ScheduleState[]) => Action<ScheduleState[]>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<ScheduleState[]>>) => ({
  setSchedule: (v: ScheduleState[]) => dispatch(scheduleAction.setSchedule(v))
});
interface OwnProps {
  toggle: () => void;
  isOpen: boolean;
  nowSchedules: ScheduleState[];
}
interface formProps {
  title: string;
  description: string;
  sh: number;
  sm: number;
  eh: number;
  em: number;
}
const initialValues: formProps = {
  title: "",
  description: "",
  sh: 0,
  sm: 0,
  eh: 0,
  em: 0
};
const AddScheduleModal: React.FC<ScheduleActions & OwnProps> = props => {
  const [sHour, setSH] = React.useState(0);
  const [sMinute, setSM] = React.useState(0);
  const [eHour, setEH] = React.useState(0);
  const [eMinute, setEM] = React.useState(0);
  const timeDuplicate = () => {
    console.log("dup");
    let result = true;
    if (
      props.nowSchedules.every(schedule => {
        return (
          (schedule.sh + schedule.sm / 60 < sHour + sMinute / 60 &&
            sHour + sMinute / 60 <= schedule.eh + schedule.em / 60) ||
          (schedule.sh + schedule.sm / 60 < eHour + eMinute / 60 &&
            eHour + eMinute / 60 <= schedule.eh + schedule.em / 60)
        );
      })
    ) {
      result = false;
    }
    return result;
  };

  const timeOver = () => {
    let result = true;
    if (sHour + sMinute / 60 >= eHour + eMinute / 60) {
      result = false;
    }
    return result;
  };
  const handleOnSubmit = (values: formProps) => {
    const newList: ScheduleState[] = props.nowSchedules;
    newList.push({
      ...values,
      color: "pink"
    });
    props.setSchedule(newList);
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

  return (
    <Modal isOpen={props.isOpen} size="lg">
      <ModalHeader>新規スケジュールの追加</ModalHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          sh: Yup.string()
            .test(
              "over",
              "終了時刻は開始時刻よりも後の時刻を指定してください。",
              () => timeOver()
            )
            .test(
              "duplicate",
              "指定された時刻にはすでに予定が入っています",
              () => timeDuplicate()
            ),
          sm: Yup.string()
            .test(
              "over",
              "終了時刻は開始時刻よりも後の時刻を指定してください。",
              () => timeOver()
            )
            .test(
              "duplicate",
              "指定された時刻にはすでに予定が入っています",
              () => timeDuplicate()
            ),
          eh: Yup.string()
            .test(
              "over",
              "終了時刻は開始時刻よりも後の時刻を指定してください。",
              () => timeOver()
            )
            .test(
              "duplicate",
              "指定された時刻にはすでに予定が入っています",
              () => timeDuplicate()
            ),
          em: Yup.string()
            .test(
              "over",
              "終了時刻は開始時刻よりも後の時刻を指定してください。",
              () => timeOver()
            )
            .test(
              "duplicate",
              "指定された時刻にはすでに予定が入っています",
              () => timeDuplicate()
            )
        })}
        onSubmit={values => handleOnSubmit(values)}
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue
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
                              invalid={errors.sh ? true : false}
                              onChange={e => {
                                setSH(parseInt(e.currentTarget.value));
                                setFieldValue(
                                  "sh",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {hourSelectoer()}
                            </Input>
                          </Col>
                          {" : "}
                          <Col sm="5">
                            <Input
                              type="select"
                              name="sm"
                              id="sm"
                              value={values.sm}
                              invalid={errors.sh ? true : false}
                              onChange={e => {
                                setSM(parseInt(e.currentTarget.value));
                                setFieldValue(
                                  "sm",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {minuteSelectoer()}
                            </Input>
                          </Col>
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
                              invalid={errors.sh ? true : false}
                              onChange={e => {
                                setEH(parseInt(e.currentTarget.value));
                                setFieldValue(
                                  "eh",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {hourSelectoer()}
                            </Input>
                          </Col>
                          {" : "}
                          <Col sm="5">
                            <Input
                              type="select"
                              name="em"
                              id="em"
                              value={values.em}
                              invalid={errors.sh ? true : false}
                              onChange={e => {
                                setEM(parseInt(e.currentTarget.value));
                                setFieldValue(
                                  "em",
                                  parseInt(e.currentTarget.value)
                                );
                              }}
                            >
                              {minuteSelectoer()}
                            </Input>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <FormFeedback>{errors.sh}</FormFeedback>
                  </Row>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
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
export default connect(undefined, mapDispatchToProps)(AddScheduleModal);
