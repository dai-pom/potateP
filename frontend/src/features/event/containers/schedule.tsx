import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Schedule } from "../components/schedule";
import { AppState } from "../../../store";
import { fetchScheduleProps } from "../../../states/event/schedule";
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { scheduleAction } from "../../../actions/event/schedule";

export interface ScheduleAction {
  fetchSchedule: (v: fetchScheduleProps) => Action<fetchScheduleProps>;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<fetchScheduleProps>>
) => ({
  fetchSchedule: (v: fetchScheduleProps) =>
    dispatch(scheduleAction.fetchSchedule(v)),
});

const mapStateToProps = (state: AppState) => ({
  schedule: state.schedule,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Schedule)
);
