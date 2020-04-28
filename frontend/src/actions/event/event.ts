import actionCreatorFactory from "typescript-fsa";
import { EventState } from "../../states/event/event";

const actionCreator = actionCreatorFactory();
export const eventActions = {
  setEvents: actionCreator<EventState[]>("SET_EVENTS"),
  addEvents: actionCreator<EventState>("ADD_EVENT"),
  fetchEvents: actionCreator<string>("FETCH_EVENTS"),
};
