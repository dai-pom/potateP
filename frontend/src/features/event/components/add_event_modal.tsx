import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import st from "./eventList.module.css";
import cn from "classnames";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as Yup from "yup";
import { eventActions } from "../containers/add_event_modal";
interface ownProps {
  isOpen: boolean;
  toggle: () => void;
  uid: string;
}

export const AddEventModal: React.FC<ownProps & eventActions> = (props) => {
  const [startDay, setStart] = useState(new Date());
  const [endDay, setEnd] = useState(new Date());
  const handleOnSubmit = (values: any) => {
    console.log("submit");
    props.addEvents({
      Id: NaN,
      Name: values.name,
      Description: values.description,
      StartDate: values.startDate,
      EndDate: values.endDate,
      OwnerId: props.uid,
    });
    props.toggle();
  };
  return (
    <Modal isOpen={props.isOpen} size="lg">
      <Formik
        initialValues={{
          name: "",
          description: "",
          startDate: moment(new Date()).format("YYYY/MM/DD"),
          endDate: moment(new Date()).format("YYYY/MM/DD"),
        }}
        validationSchema={Yup.object().shape({
          startDate: Yup.string()
            .required()
            .test("checkDate", "過去の日付は指定できません", (date) => {
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
            .test("checkDate", "過去の日付は指定できません", (date) => {
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
              (date) => {
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
          name: Yup.string().required("必須項目です"),
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
                  {values.startDate}
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
                        (values.startDate && new Date(values.startDate)) || null
                      }
                      startDate={moment(values.startDate).toDate()}
                      endDate={moment(values.endDate).toDate()}
                      value={values.startDate}
                      onChange={(val) => {
                        if (val != null) {
                          setFieldValue(
                            "startDate",
                            moment(val).format("YYYY/MM/DD")
                          );
                          setStart(val);
                        }
                      }}
                      className={cn({
                        [st.errorDate]: errors.startDate,
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
                      onChange={(val) => {
                        if (val != null) {
                          setFieldValue(
                            "endDate",
                            moment(val).format("YYYY/MM/DD")
                          );
                        }
                      }}
                      className={cn({
                        [st.errorDate]: errors.endDate,
                      })}
                    />
                    <span className="text-danger small">{errors.endDate}</span>
                  </div>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  作成
                </Button>
                <Button onClick={props.toggle}>キャンセル</Button>
              </ModalFooter>
            </Form>
          </>
        )}
      />
    </Modal>
  );
};
