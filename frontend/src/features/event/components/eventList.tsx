import React, { useState, useEffect } from "react";
import icon from "../../../image/logo192.png";
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import st from "./eventList.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link, RouteComponentProps } from "react-router-dom";
import classNames from "classnames";
import AddEventModal from "../containers/add_event_modal";
import { AppState } from "../../../store";
import { EventListActions } from "../containers/eventList";
interface OwnProps {}
type EventListProps = OwnProps & AppState & EventListActions;

export const EventList: React.FC<EventListProps & RouteComponentProps> = (
  props
) => {
  const [modal, setModal] = useState(false);
  const [hover, setHover] = useState(-1);
  useEffect(() => {
    props.fetchEvents(props.user.uid);
  }, [props.events.length]);
  const modalToggle = () => {
    setModal(!modal);
  };
  return (
    <Container>
      <AddEventModal isOpen={modal} toggle={modalToggle} uid={props.user.uid} />
      <Row>
        <h2>イベント一覧</h2>
      </Row>
      <Row>
        <Col sm={{ size: 2, offset: 10 }}>
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={modalToggle}
          >
            追加
          </Button>
        </Col>
      </Row>

      <Row>
        {props.events.map((event, idx) => {
          return (
            <Col sm="3" className={st.eventlist} key={idx}>
              <Link to={`/events/${event.Id}`} className={st.link}>
                <Card
                  className={classNames({ [st.hover]: hover == idx })}
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(-1)}
                >
                  <CardImg top width="100" src={icon} />
                  <CardBody>
                    <CardTitle>{event.Name}</CardTitle>
                    <CardText>
                      {event.StartDate}～{event.EndDate}
                    </CardText>
                    <CardText>{event.Description}</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
