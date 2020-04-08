import actionCreatorFactory from "typescript-fsa";
import { ScheduleState } from "../../states/event/schedule";

const actionCreator = actionCreatorFactory();
export const scheduleAction = {
  setSchedule: actionCreator<ScheduleState[]>("ACTION_SET_SCHEDULE")
};
