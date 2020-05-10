import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Container, Navbar, NavItem, Nav } from "reactstrap";
import WithEventSideBar from "../containers/sidebar";
import { OverviewActions } from "../containers/event_overview";
import { AppState } from "../../../store";

type OverviewProps = RouteComponentProps<{ eid: string }> &
  OverviewActions &
  Pick<AppState, "event">;

export const EventOverview: React.FC<OverviewProps> = (props) => {
  React.useEffect(() => {
    props.fetchEvent(Number(props.match.params.eid));
  }, []);
  const params = props.match.params;
  return (
    <WithEventSideBar eid={params.eid}>
      <Container>event</Container>
    </WithEventSideBar>
  );
};
