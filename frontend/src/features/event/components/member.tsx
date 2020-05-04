import * as React from "react";
import { memberAction } from "../containers/member";
import { AppState } from "../../../store";
import WithEventSideBar from "../containers/sidebar";
import { RouteComponentProps } from "react-router";
import { Container, Row, Col, Button, Table } from "reactstrap";
import AddMemberModal from "./add_member_modal";
type MemberProps = memberAction &
  Pick<AppState, "member" | "events"> &
  RouteComponentProps<{ eid: string }>;
export const MemberList: React.FC<MemberProps> = (props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const addMemberToggle = () => {
    console.log("aaa");
    setModalOpen(!isModalOpen);
  };
  React.useEffect(() => {
    props.fetchMember(Number(props.match.params.eid));
  }, []);
  return (
    <WithEventSideBar eid={props.match.params.eid}>
      <AddMemberModal
        eid={props.match.params.eid}
        toggle={addMemberToggle}
        isOpen={isModalOpen}
      />
      <Container>
        <Row>
          <Col sm={12}>
            <h1>メンバー一覧</h1>
          </Col>
          <Col sm={{ size: 2, offset: 10 }}>
            <Button onClick={addMemberToggle}>メンバー追加</Button>
          </Col>
          <Col sm={12}>
            <Table>
              <thead>
                <tr>
                  <th>名前</th>
                  <th>e-mail</th>
                </tr>
              </thead>
              <tbody>
                {props.member.map((value, idx) => {
                  return (
                    <tr key={idx}>
                      <th>{value.name}</th>
                      <th>{value.email}</th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </WithEventSideBar>
  );
};
