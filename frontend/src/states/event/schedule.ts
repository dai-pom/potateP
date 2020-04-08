import { reducerWithInitialState } from "typescript-fsa-reducers";
import { scheduleAction } from "../../actions/event/schedule";
export interface ScheduleState {
  // id: number;
  sh: number;
  sm: number;
  eh: number;
  em: number;
  title: string;
  description?: string;
  color: string;
}

const initialState: ScheduleState[] = [];
export const scheduleReducer = reducerWithInitialState(initialState).case(
  scheduleAction.setSchedule,
  (state, schedule) => {
    return schedule;
  }
);
