import actionCreatorFactory from "typescript-fsa";
import { ErrorState } from "../states/error";

const actionCreator = actionCreatorFactory();

export const errorActions = {
  setError: actionCreator<ErrorState>("SET_ERROR"),
};
