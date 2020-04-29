import { reducerWithInitialState } from "typescript-fsa-reducers";
import moment from "moment";
import { scheduleAction } from "../../actions/event/schedule";
export interface ScheduleState {
  // id: number;
  Eid: number;
  Date: moment.Moment;
  Start: moment.Moment;
  End: moment.Moment;
  Title: string;
  Description?: string;
  Color: string;
  UserName: string;
}
export interface fetchScheduleProps {
  Eid: number;
  Date: string;
}

const initialState: ScheduleState[] = [];
export const scheduleReducer = reducerWithInitialState(initialState).case(
  scheduleAction.setSchedule,
  (state, schedule) => {
    return schedule;
  }
);
