import { eventActions } from "../../actions/event/event";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export interface EventState {
  Id: number;
  StartDate: string;
  EndDate: string;
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
