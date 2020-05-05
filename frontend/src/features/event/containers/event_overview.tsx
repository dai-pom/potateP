import { withRouter } from "react-router";
import { connect } from "react-redux";
import { EventOverview } from "../components/event_overview";
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { eventActions } from "../../../actions/event/event";
import { AppState } from "../../../store";
export interface OverviewActions {
  fetchEvent: (v: number) => Action<number>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<number>>) => ({
  fetchEvent: (v: number) => dispatch(eventActions.fetchEvent(v)),
});

const mapStateToProps = (AppState: AppState) => ({
  event: AppState.event,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventOverview)
);
