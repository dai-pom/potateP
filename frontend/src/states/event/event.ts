import { eventActions } from "../../actions/event/event";
import {
  reducerWithInitialState,
  reducerWithoutInitialState,
} from "typescript-fsa-reducers";
import moment from "moment";

export interface EventState {
  Id: number;
  StartDate: moment.Moment;
  EndDate: moment.Moment;
  Name: string;
  Description: string;
  OwnerId: string;
}
const initialState: EventState[] = [];
export const eventsReducer = reducerWithInitialState(initialState).case(
  eventActions.setEvents,
  (state, event) => {
    return event;
  }
);
export const eventInitial: EventState = {
  Id: NaN,
  StartDate: moment(),
  EndDate: moment(),
  Name: "",
  Description: "",
  OwnerId: "",
};

export const eventReducer = reducerWithInitialState(eventInitial).case(
  eventActions.setEvent,
  (state, event: EventState) => {
    return event;
  }
);
