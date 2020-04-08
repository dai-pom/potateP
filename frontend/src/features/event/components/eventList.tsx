import React, { useState } from "react";
import icon from "../../../image/logo192.png";
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import st from "./eventList.module.css";
import { Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Link, RouteComponentProps } from "react-router-dom";
import classNames from "classnames";
import * as Yup from "yup";
interface OwnProps {}

const sampleEvent = [
  { name: "hoge", description: "fuga", icon: icon, eid: 1 },
  { name: "hoge", description: "fuga", icon: icon, eid: 2 },
  { name: "hoge", description: "fuga", icon: icon, eid: 3 },
  { name: "hoge", description: "fuga", icon: icon, eid: 4 },
  { name: "hoge", description: "fuga", icon: icon, eid: 5 }
];
export const EventList: React.FC<OwnProps & RouteComponentProps> = () => {
  const [modal, setModal] = useState(false);
  const [hover, setHover] = useState(-1);
  const [startDay, setStart] = useState(new Date());
  const [endDay, setEnd] = useState(new Date());
  const modalToggle = () => {
    setModal(!modal);
  };
  const handleOnSubmit = (values: any) => {
    modalToggle();
  };
  return (
    <Container>
      <Row>
        <h2>イベント一覧</h2>
      </Row>
      <Row>
        <Col sm={{ size: 2, offset: 10 }}>
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={modalToggle}
          >
            追加
          </Button>
        </Col>
      </Row>
      <Modal isOpen={modal} size="lg">
        <Formik
          initialValues={{
            name: "",
            description: "",
            startDate: moment(new Date()).format("YYYY/MM/DD"),
            endDate: moment(new Date()).format("YYYY/MM/DD")
          }}
          validationSchema={Yup.object().shape({
            startDate: Yup.string()
              .required()
              .test("checkDate", "過去の日付は指定できません", date => {
                const selectedDate = new Date(date);
                const nowDate = new Date();
                if (
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate()
                  ) >=
                  new Date(
                    nowDate.getFullYear(),
                    nowDate.getMonth(),
                    nowDate.getDate()
                  )
                ) {
                  return true;
                } else {
                  return false;
                }
              }),
            endDate: Yup.string()
              .required()
              .test("checkDate", "過去の日付は指定できません", date => {
                const selectedDate = new Date(date);
                const nowDate = new Date();
                if (
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate()
                  ) >=
                  new Date(
                    nowDate.getFullYear(),
                    nowDate.getMonth(),
                    nowDate.getDate()
                  )
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .test(
                "checkLogic",
                "開始日より前の日付は指定できません",
                date => {
                  const selectedDate = new Date(date);
                  const selectStartDate = new Date(startDay);
                  if (
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate()
                    ) >=
                    new Date(
                      selectStartDate.getFullYear(),
                      selectStartDate.getMonth(),
                      selectStartDate.getDate()
                    )
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                }
              ),
            name: Yup.string().required("必須項目です")
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
              <ModalHeader>新規イベントの作成</ModalHeader>
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">イベント名</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.name && errors.name ? true : false}
                      required={true}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">説明</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        touched.description && errors.description ? true : false
                      }
                    />
                    <FormFeedback>{errors.description}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label for="name">日程</Label>
                    </div>
                    <div>
                      <Label for="name">開始日：</Label>
                      <DatePicker
                        locale="ja"
                        name="startDate"
                        id="startDate"
                        selectsStart
                        selected={
                          (values.startDate && new Date(values.startDate)) ||
                          null
                        }
                        startDate={moment(values.startDate).toDate()}
                        endDate={moment(values.endDate).toDate()}
                        value={values.startDate}
                        onChange={val => {
                          if (val != null) {
                            setFieldValue(
                              "startDate",
                              moment(val).format("YYYY/MM/DD")
                            );
                            setStart(val);
                          }
                        }}
                        className={classNames({
                          [st.errorDate]: errors.startDate
                        })}
                      />
                      <span className="text-danger small">
                        {errors.startDate}
                      </span>
                    </div>
                    <div>
                      <Label for="name">終了日：</Label>
                      <DatePicker
                        locale="ja"
                        selectsEnd
                        name="endDate"
                        id="endDate"
                        startDate={moment(values.startDate).toDate()}
                        endDate={moment(values.endDate).toDate()}
                        selected={
                          (values.endDate && new Date(values.endDate)) || null
                        }
                        value={values.endDate}
                        onChange={val => {
                          if (val != null) {
                            setFieldValue(
                              "endDate",
                              moment(val).format("YYYY/MM/DD")
                            );
                          }
                        }}
                        className={classNames({
                          [st.errorDate]: errors.endDate
                        })}
                      />
                      <span className="text-danger small">
                        {errors.endDate}
                      </span>
                    </div>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary">
                    作成
                  </Button>
                  <Button onClick={modalToggle}>キャンセル</Button>
                </ModalFooter>
              </Form>
            </>
          )}
        />
      </Modal>
      <Row>
        {sampleEvent.map((event, idx) => {
          return (
            <Col sm="3" className={st.eventlist} key={idx}>
              <Link to={`/events/${event.eid}`} className={st.link}>
                <Card
                  className={classNames({ [st.hover]: hover == idx })}
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(-1)}
                >
                  <CardImg top width="100%" src={event.icon} />
                  <CardBody>
                    <CardTitle>{event.name}</CardTitle>
                    <CardText>{event.description}</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
