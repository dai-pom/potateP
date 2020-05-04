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
  NavItem,
} from "reactstrap";
import classNames from "classnames";
import st from "./sidebar.module.css";
import { NavLink as RRNavLink, RouteComponentProps } from "react-router-dom";
import { AppState } from "../../../store";
import moment from "moment";
import { ScheduleAction } from "../containers/sidebar";
interface OwnProps {
  eid: string;
  children: React.ReactNode;
}
type SideBarProps = OwnProps &
  ScheduleAction &
  Pick<AppState, "user" | "events">;

export const WithEventSideBar: React.FC<SideBarProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const moveSchedule = React.useCallback((day: moment.Moment) => {
    props.fetchSchedule({
      Eid: Number(props.eid),
      Date: moment(day).format("YYYY-MM-DD"),
    });
  }, []);
  const RightDrop = (
    title: string,
    urlImpl: string,
    items: moment.Moment[],
    idx: number
  ) => {
    return (
      <Row className={st.sideList} key={idx}>
        <Col xs={{ size: 10, offset: 1 }} className={st.link}>
          <Dropdown direction="right" isOpen={isOpen} toggle={toggle}>
            <DropdownToggle tag={NavLink} caret>
              {title}
            </DropdownToggle>
            <DropdownMenu style={{ zIndex: 10 }}>
              {items.map((value, idx) => {
                return (
                  <DropdownItem>
                    <NavLink
                      tag={RRNavLink}
                      to={`${urlImpl}/${moment(value).format("YYYY-MM-DD")}`}
                      onClick={() => moveSchedule(value)}
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
  const schedule = () => {
    const event = props.events.find((event) => event.Id === Number(props.eid));
    if (event) {
      const days: moment.Moment[] = [event.StartDate];
      if (event) {
        const bet = moment(event.EndDate).diff(event.StartDate, "day");
        for (let i = 0; i < bet; i++) {
          days.push(moment(event.StartDate).add(i + 1, "day"));
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
      title: "member",
      url: `/events/${props.eid}/member`,
    },
  ];
  return (
    <>
      <div className={classNames(st.sidemenu)}>
        <Container>
          {linkList.map((value, idx) => {
            if (value.children) {
              return RightDrop(value.title, value.url, value.children, idx);
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
