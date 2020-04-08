import * as React from "react";
import {
  Container,
  Row,
  Col,
  NavLink,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import classNames from "classnames";
import st from "./sidebar.module.css";
import { NavLink as RRNavLink } from "react-router-dom";
import { prependOnceListener } from "cluster";
interface OwnProps {
  eid: string;
}
interface OwnState {}
const tempSchedule = [
  {
    time: "2020 / 02 / 12"
  }
];
interface schedule {
  time: string;
}
interface subMenuProps {
  title: string;
  urlImpl: string;
  items: schedule[];
  idx: number;
}
const RightDrop: React.FC<subMenuProps> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Row className={st.sideList} key={props.idx}>
      <Col xs={{ size: 10, offset: 1 }} className={st.link}>
        <Dropdown direction="right" isOpen={isOpen} toggle={toggle}>
          <DropdownToggle tag={NavLink} caret>
            {props.title}
          </DropdownToggle>
          <DropdownMenu>
            {props.items.map((value, idx) => {
              return (
                <DropdownItem>
                  <NavLink to={`${props.urlImpl}/${idx}`} tag={RRNavLink}>
                    {value.time}
                  </NavLink>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  );
};
export class WithEventSideBar extends React.Component<OwnProps, OwnState> {
  public linkList = [
    {
      title: "overview",
      url: `/events/${this.props.eid}`
    },
    {
      title: "schedule",
      url: `/events/${this.props.eid}/schedule`,
      children: tempSchedule
    },
    {
      title: "piyo",
      url: "/home"
    }
  ];
  render() {
    return (
      <>
        <div className={classNames(st.sidemenu)}>
          <Container>
            {this.linkList.map((value, idx) => {
              if (value.children) {
                return (
                  <RightDrop
                    title={value.title}
                    urlImpl={value.url}
                    items={value.children}
                    idx={idx}
                  />
                );
              } else {
                return (
                  <Row className={st.sideList} key={idx}>
                    <Col xs={{ size: 10, offset: 1 }} className={st.link}>
                      <NavLink tag={RRNavLink} to={value.url}>
                        {value.title}
                      </NavLink>
                    </Col>
                  </Row>
                );
              }
            })}
          </Container>
        </div>
        <div className={st.mainpain}>{this.props.children}</div>
      </>
    );
  }
}
