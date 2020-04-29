import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Container, Navbar, NavItem, Nav } from "reactstrap";
import WithEventSideBar from "../containers/sidebar";

export class EventOverview extends React.Component<
  RouteComponentProps<{ eid: string }>
> {
  public render() {
    const params = this.props.match.params;
    console.log(params);
    return (
      <WithEventSideBar eid={params.eid}>
        <Container>event overviewaaa12 console.warn();</Container>
      </WithEventSideBar>
    );
  }
}
