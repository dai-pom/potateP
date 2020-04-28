import { withRouter } from "react-router";
import { EventList } from "../components/eventList";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { eventActions } from "../../../actions/event/event";

export interface EventListActions {
  fetchEvents: (v: string) => Action<string>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => ({
  fetchEvents: (v: string) => dispatch(eventActions.fetchEvents(v)),
});

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user,
  events: AppState.events,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventList)
);
