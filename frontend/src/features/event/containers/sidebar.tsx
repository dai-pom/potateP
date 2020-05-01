import { WithEventSideBar } from "../components/sidebar";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { fetchScheduleProps } from "../../../states/event/schedule";
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { scheduleAction } from "../../../actions/event/schedule";

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user,
  events: AppState.events,
});
export type ScheduleAction = {
  fetchSchedule: (v: fetchScheduleProps) => Action<fetchScheduleProps>;
};
const mapDispatchToProps = (
  dispatch: Dispatch<Action<fetchScheduleProps>>
) => ({
  fetchSchedule: (v: fetchScheduleProps) =>
    dispatch(scheduleAction.fetchSchedule(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithEventSideBar);
