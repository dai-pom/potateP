import { EventState } from "../../../states/event/event";
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { eventActions } from "../../../actions/event/event";
import { connect } from "react-redux";
import { AddEventModal } from "../components/add_event_modal";
import { AppState } from "../../../store";

export interface eventActions {
  addEvents: (v: EventState) => Action<EventState>;
}
const mapDispatchToProps = (dispatch: Dispatch<Action<EventState>>) => ({
  addEvents: (v: EventState) => dispatch(eventActions.addEvents(v)),
});
const mapStateToProps = (AppState: AppState) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventModal);
