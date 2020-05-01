import actionCreatorFactory from "typescript-fsa";
import { ScheduleState, fetchScheduleProps } from "../../states/event/schedule";

const actionCreator = actionCreatorFactory();
export const scheduleAction = {
  setSchedule: actionCreator<ScheduleState[]>("SET_SCHEDULE"),
  fetchSchedule: actionCreator<fetchScheduleProps>("FETCH_SCHEDULE"),
  addSchedule: actionCreator<ScheduleState>("ADD_SCHEDULE"),
  deleteSchedule: actionCreator<number>("DELETE_SCHEDULE"),
};
