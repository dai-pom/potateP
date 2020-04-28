import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { userActions } from "../../../actions/user";
import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface actions {
  logout: () => Action<void>;
}
interface ownProps {
  isOpen: boolean;
  toggle: () => void;
}
const LogoutModal: React.FC<actions & ownProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>ログアウト</ModalHeader>
      <ModalBody>ログアウトしてもよろしいですか？</ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            props.logout();
          }}
        >
          OK
        </Button>
        <Button onClick={props.toggle}>キャンセル</Button>
      </ModalFooter>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch: Dispatch<Action<void>>) => ({
  logout: () => dispatch(userActions.logout()),
});

export default connect(undefined, mapDispatchToProps)(LogoutModal);
