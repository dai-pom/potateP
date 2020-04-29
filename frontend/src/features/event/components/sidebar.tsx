import * as React from "react";
import {
  Container,
  Row,
  Col,
  NavLink,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classNames from "classnames";
import st from "./sidebar.module.css";
import { NavLink as RRNavLink } from "react-router-dom";
import { AppState } from "../../../store";
import moment from "moment";
interface OwnProps {
  eid: string;
  children: React.ReactNode;
}
type SideBarProps = OwnProps & Omit<AppState, "schedule">;
interface subMenuProps {
  title: string;
  urlImpl: string;
  items: moment.Moment[];
  idx: number;
}
const RightDrop: React.FC<subMenuProps> = (props) => {
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
                  <NavLink
                    to={`${props.urlImpl}/${moment(value).format(
                      "YYYY-MM-DD"
                    )}`}
                    tag={RRNavLink}
                    key={idx}
                  >
                    {moment(value).format("YYYY/MM/DD")}
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

export const WithEventSideBar: React.FC<SideBarProps> = (props) => {
  const schedule = () => {
    const event = props.events.find((event) => event.Id === Number(props.eid));
    if (event) {
      const days: moment.Moment[] = [event.StartDate];
      if (event) {
        for (
          let i = 0;
          i < moment(event.EndDate).diff(event.StartDate, "day");
          i++
        ) {
          days.push(moment(event.StartDate).add(1, "day"));
        }
      }
      return days;
    }
    return [];
  };
  const linkList = [
    {
      title: "overview",
      url: `/events/${props.eid}`,
    },
    {
      title: "schedule",
      url: `/events/${props.eid}/schedule`,
      children: schedule(),
    },
    {
      title: "piyo",
      url: "/home",
    },
  ];
  return (
    <>
      <div className={classNames(st.sidemenu)}>
        <Container>
          {linkList.map((value, idx) => {
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
      <div className={st.mainpain}>{props.children}</div>
    </>
  );
};
