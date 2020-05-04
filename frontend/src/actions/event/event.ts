import actionCreatorFactory from "typescript-fsa";
import { EventState } from "../../states/event/event";
import { UserState } from "../../states/user";

export interface AddMemberState {
  EventId: number;
  UserID: string;
}
const actionCreator = actionCreatorFactory();
export const eventActions = {
  setEvents: actionCreator<EventState[]>("SET_EVENTS"),
  addEvents: actionCreator<EventState>("ADD_EVENT"),
  fetchEvents: actionCreator<string>("FETCH_EVENTS"),
  fetchMember: actionCreator<number>("FETCH_MEMBER"),
  setMember: actionCreator<UserState[]>("SET_MEMBER"),
  addMember: actionCreator<AddMemberState>("ADD_MEMBER"),
};
