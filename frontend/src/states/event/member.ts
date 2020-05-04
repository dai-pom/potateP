import { UserState } from "../user";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { eventActions } from "../../actions/event/event";

const initialState: UserState[] = [];

export const memberReducer = reducerWithInitialState(initialState).case(
  eventActions.setMember,
  (state, member) => {
    return member;
  }
);
