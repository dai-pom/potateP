import * as React from "react";
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { userActions } from "../../../actions/user";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import { Formik, Form } from "formik";
import { AddMemberState, eventActions } from "../../../actions/event/event";

interface AddMemberAction {
  searchUser: (v: string) => Action<string>;
  addMember: (v: AddMemberState) => Action<AddMemberState>;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<string | AddMemberState>>
) => ({
  searchUser: (v: string) => dispatch(userActions.fetchSearchUser(v)),
  addMember: (v: AddMemberState) => dispatch(eventActions.addMember(v)),
});
const mapStateToProps = (state: AppState) => ({
  searchedUser: state.searchedUser,
  member: state.member,
});
interface OwnProps {
  toggle: () => void;
  isOpen: boolean;
  eid: string;
}

type AddMemberProps = OwnProps &
  AddMemberAction &
  Pick<AppState, "searchedUser" | "member">;

const AddMemberModal: React.FC<AddMemberProps> = (props) => {
  const [isSearched, setIsSearched] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const handleSearch = (email: string) => {
    props.searchUser(email);
    setIsSearched(true);
  };
  const handleSubmit = () => {
    props.addMember({
      EventId: Number(props.eid),
      UserID: props.searchedUser.uid,
    });
    props.toggle();
  };
  const SearchResult = () => {
    if (
      isSearched &&
      props.searchedUser.name != "" &&
      props.member.find((mem) => mem.uid === props.searchedUser.uid)
    ) {
      setReady(false);
      return <div>指定したユーザーはすでにメンバーです</div>;
    } else if (
      isSearched &&
      props.searchedUser.name != "" &&
      !props.member.find((mem) => mem.uid === props.searchedUser.uid)
    ) {
      setReady(true);
      return <div>ユーザー名：{props.searchedUser.name}</div>;
    } else if (isSearched && props.searchedUser.name == "") {
      setReady(false);
      return <div>指定のユーザーは存在しません</div>;
    } else {
      setReady(false);
      return <></>;
    }
  };
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>メンバーの追加</ModalHeader>
      <ModalBody>
        <Formik initialValues={{ email: "" }} onSubmit={() => {}}>
          {(formikBag) => (
            <Form>
              <div>追加したいユーザーのメールアドレス</div>
              <FormGroup inline>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={formikBag.values.email}
                  invalid={formikBag.errors.email ? true : false}
                  required={true}
                  onChange={(e) =>
                    formikBag.setFieldValue("email", e.currentTarget.value)
                  }
                />
                <Button onClick={() => handleSearch(formikBag.values.email)}>
                  検索
                </Button>
              </FormGroup>
            </Form>
          )}
        </Formik>
        <SearchResult />
      </ModalBody>
      <ModalFooter>
        <Button disabled={!ready} onClick={handleSubmit}>
          追加
        </Button>
        <Button onClick={props.toggle}>キャンセル</Button>
      </ModalFooter>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberModal);
