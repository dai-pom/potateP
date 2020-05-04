import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { eventActions } from "../../../actions/event/event";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import { MemberList } from "../components/member";

export interface memberAction {
  fetchMember: (v: number) => Action<number>;
}

const mapDispatchToProps = (dispatch: Dispatch<Action<number>>) => ({
  fetchMember: (v: number) => dispatch(eventActions.fetchMember(v)),
});

const mapStateToProps = (state: AppState) => ({
  member: state.member,
  event: state.events,
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
