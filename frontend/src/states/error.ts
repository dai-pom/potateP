import { reducerWithInitialState } from "typescript-fsa-reducers";
import { errorActions } from "../actions/error";

export interface ErrorState {
  code: number;
}
const initialState: ErrorState = {
  code: NaN,
};

export const errorReducer = reducerWithInitialState(initialState).case(
  errorActions.setError,
  (state, error) => {
    return error;
  }
);
