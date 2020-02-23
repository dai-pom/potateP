import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Container, Navbar, NavItem, Nav } from "reactstrap";
import { WithEventSideBar } from "./sidebar";

export class EventOverview extends React.Component<
  RouteComponentProps<{ eid: string }>
> {
  public render() {
    const params = this.props.match.params;
    console.log(params);
    return (
      <WithEventSideBar eid={params.eid}>
        <Container>event overview</Container>
        <div style={{ marginBottom: "2000px" }}>sita</div>
      </WithEventSideBar>
    );
  }
}
