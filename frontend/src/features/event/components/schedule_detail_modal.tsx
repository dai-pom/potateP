import * as React from "react";
import { ScheduleItem } from "./schedule";
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from "reactstrap";
export {};
interface OwnProps {
  isOpen: boolean;
  eid: string;
  sid: string;
  detail?: ScheduleItem;
  toggle: () => void;
}
export const ScheduleDetailModal: React.FC<OwnProps> = props => {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>スケジュール詳細</ModalHeader>
      <ModalBody>{props.detail?.title}</ModalBody>
      <ModalFooter>
        <Button onClick={props.toggle}>閉じる</Button>
      </ModalFooter>
    </Modal>
  );
};
