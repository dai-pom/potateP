import * as React from "react";
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from "reactstrap";
import { ScheduleState } from "../../../states/event/schedule";
export {};
interface OwnProps {
  isOpen: boolean;
  eid: string;
  sid: string;
  detail?: ScheduleState;
  toggle: () => void;
}
export const ScheduleDetailModal: React.FC<OwnProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>スケジュール詳細</ModalHeader>
      <ModalBody>{props.detail?.Title}</ModalBody>
      <ModalFooter>
        <Button onClick={props.toggle}>閉じる</Button>
      </ModalFooter>
    </Modal>
  );
};
