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
  const [startDay, setStart] = useState(moment());
  const [endDay, setEnd] = useState(moment());
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
          startDate: moment(),
          endDate: moment(),
        }}
        validationSchema={Yup.object().shape({
          startDate: Yup.string()
            .required()
            .test("checkDate", "過去の日付は指定できません", (date) => {
              const nowDate = moment();
              if (nowDate.isSameOrBefore(date, "day")) {
                return true;
              } else {
                return false;
              }
            }),
          endDate: Yup.string()
            .required()
            .test("checkDate", "過去の日付は指定できません", (date) => {
              const nowDate = moment();
              if (nowDate.isSameOrBefore(date, "day")) {
                return true;
              } else {
                return false;
              }
            })
            .test(
              "checkLogic",
              "開始日より前の日付は指定できません",
              (date) => {
                if (startDay.isSameOrBefore(date, "day")) {
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
                        (values.startDate && values.startDate.toDate()) || null
                      }
                      startDate={moment(values.startDate).toDate()}
                      endDate={moment(values.endDate).toDate()}
                      value={values.startDate.format("YYYY/MM/DD")}
                      onChange={(val) => {
                        if (val != null) {
                          setFieldValue("startDate", moment(val));
                          setStart(moment(val));
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
                      startDate={values.startDate.toDate()}
                      endDate={values.endDate.toDate()}
                      selected={
                        (values.endDate && values.endDate.toDate()) || null
                      }
                      value={values.endDate.format("YYYY/MM/DD")}
                      onChange={(val) => {
                        if (val != null) {
                          setFieldValue("endDate", moment(val));
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
