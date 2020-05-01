import * as React from "react";
import moment from "moment";
import {
  Modal,
  ModalBody,
  Button,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
} from "reactstrap";
import { ScheduleState } from "../../../states/event/schedule";
import { Action } from "typescript-fsa";
import { eventActions } from "../../../actions/event/event";
import { scheduleAction } from "../../../actions/event/schedule";
import { Dispatch } from "redux";
import { AppState } from "../../../store";
import { connect } from "react-redux";
export {};
interface OwnProps {
  isOpen: boolean;
  eid: string;
  sid: string;
  detail: ScheduleState;
  toggle: () => void;
}
interface ScheduleDetailActions {
  deleteSchedule: (v: number) => Action<number>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<number>>) => ({
  deleteSchedule: (v: number) => dispatch(scheduleAction.deleteSchedule(v)),
});
const mapStateToProps = (AppState: AppState) => ({});
const ScheduleDetailModal: React.FC<OwnProps & ScheduleDetailActions> = (
  props
) => {
  const handleDelete = () => {
    props.deleteSchedule(props.detail.Id);
    props.toggle();
  };
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>スケジュール詳細</ModalHeader>
      <ModalBody>
        <Container>
          <Row>タイトル：{props.detail?.Title}</Row>
          <Row>説明：{props.detail?.Description}</Row>
          <Row>
            時間：{moment(props.detail?.Start).format("HH:mm")}～
            {moment(props.detail?.End).format("HH:mm")}
          </Row>
          <Row>作成者：{props.detail?.UserName}</Row>
        </Container>
      </ModalBody>

      <ModalFooter>
        <Button onClick={props.toggle}>閉じる</Button>
        <Button color="danger" onClick={handleDelete}>
          削除
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetailModal);
