import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Container, Navbar, NavItem, Nav, Row, Col, Button } from "reactstrap";
import WithEventSideBar from "../containers/sidebar";
import st from "./schedule.module.css";
import cn from "classnames";
import ScheduleDetailModal from "./schedule_detail_modal";
import { ScheduleState } from "../../../states/event/schedule";
import { AppState } from "../../../store";
import AddScheduleModal from "./add_schedule_modal";
import moment from "moment";
import { ScheduleAction } from "../containers/schedule";

type ComponentProps = RouteComponentProps<{
  date: string;
  eid: string;
}> &
  Pick<AppState, "schedule" | "events"> &
  ScheduleAction;
export const Schedule: React.FC<ComponentProps> = (props) => {
  const params = props.match.params;
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [modalProp, setModalProp] = React.useState<ScheduleState>();

  // React.useEffect(() => {
  //   props.fetchSchedule({ Eid: Number(params.eid), Date: params.date });
  // }, [props.schedule.length]);

  const DetailModalToggle = () => {
    setIsDetailModalOpen(!isDetailModalOpen);
  };
  const AddModalToggle = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const modalOpen = (item: ScheduleState) => {
    setModalProp(item);
    DetailModalToggle();
  };
  const line = () => {
    const list = [];
    for (var i = 0; i < 25; i++) {
      list.push(
        <Row
          className={st.line}
          style={{
            top: `${5 * i}vh`,
          }}
        />
      );
    }
    return list;
  };
  const timeDisp = () => {
    const list = [];
    for (var i = 0; i < 25; i++) {
      list.push(
        <div
          className={cn(st.time_disp)}
          style={{
            top: `${2.5 + 5 * i}vh`,
          }}
        >
          {`${i}:00`}
        </div>
      );
    }
    return list;
  };
  const item = () => {
    const list: JSX.Element[] = [];
    //のちのち一日の活動時間を変えられるようにしたときの為に
    const zero = moment("00:00", "hh:mm");
    props.schedule.forEach((item) => {
      const topPos = `${
        5 + (5 * moment(item.Start).diff(zero, "minute")) / 60
      }vh`;
      const height = () => {
        // return (item.eh - item.sh) * 5 + (5 * (item.em - item.sm)) / 60;
        return (5 * moment(item.End).diff(item.Start, "minute")) / 60;
      };
      list.push(
        <Row
          className={cn(st.item)}
          style={{
            top: topPos,
            height: `${height()}vh`,
            width: "100%",
            backgroundColor: item.Color,
            borderRadius: "10px",
            border: "1px",
          }}
          onClick={() => modalOpen(item)}
        >
          <Container>
            {height() > 2 && (
              <Row>
                <Col sm="2">{`${moment(item.Start).format("hh:mm")}~${moment(
                  item.End
                ).format("hh:mm")}`}</Col>
                <Col sm="10">{item.Title}</Col>
              </Row>
            )}
          </Container>
        </Row>
      );
    });
    return list;
  };
  const DateController = () => {
    const today = moment(params.date, "YYYY-MM-DD");
    const event = props.events.find((event) => event.Id === Number(params.eid));
    const move = React.useCallback((day: moment.Moment) => {
      props.fetchSchedule({
        Eid: Number(params.eid),
        Date: moment(day).format("YYYY-MM-DD"),
      });
      props.history.push(
        `/events/${params.eid}/schedule/${day.format("YYYY-MM-DD")}`
      );
    }, []);
    return (
      <Row style={{ marginTop: "10px" }}>
        <Col sm={{ size: 2 }} style={{ textAlign: "center" }}>
          {!today.isSame(event?.StartDate, "day") && (
            <Button onClick={() => move(today.subtract(1, "day"))}>
              前の日
            </Button>
          )}
        </Col>
        <Col sm={{ size: 2, offset: 8 }} style={{ textAlign: "center" }}>
          {!today.isSame(event?.EndDate, "day") && (
            <Button onClick={() => move(today.add(1, "day"))}>次の日</Button>
          )}
        </Col>
      </Row>
    );
  };
  return (
    <WithEventSideBar eid={params.eid}>
      <Container>
        <Row>
          <h3>スケジュール</h3>
          <h3>{params.date}</h3>
        </Row>
        <Row>
          <Col sm={{ offset: 10, size: 2 }}>
            <Button
              color="primary"
              style={{ width: "100%" }}
              onClick={() => AddModalToggle()}
            >
              追加
            </Button>
          </Col>
        </Row>
        <DateController />
        <Row>
          <Col sm="1" className={cn(st.time)}>
            {timeDisp()}
          </Col>
          <Col sm="11">
            <Container className={cn(st.box)} style={{}}>
              {line()}
              {item()}
            </Container>
          </Col>
        </Row>
      </Container>
      <ScheduleDetailModal
        eid={params.eid}
        sid={params.date}
        isOpen={isDetailModalOpen}
        detail={modalProp!}
        toggle={DetailModalToggle}
      />
      <AddScheduleModal
        eid={params.eid}
        date={moment(params.date, "YYYY-MM-DD")}
        isOpen={isAddModalOpen}
        toggle={AddModalToggle}
        nowSchedules={props.schedule}
      />
    </WithEventSideBar>
  );
};
