import { eventActions } from "../../actions/event/event";
import { reducerWithInitialState } from "typescript-fsa-reducers";
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
export const eventReducer = reducerWithInitialState(initialState).case(
  eventActions.setEvents,
  (state, event) => {
    return event;
  }
);
