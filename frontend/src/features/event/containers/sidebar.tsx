import { AppState } from "../../../store";
import { connect } from "react-redux";
import { WithEventSideBar } from "../components/sidebar";

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user,
  events: AppState.events,
});

export default connect(mapStateToProps)(WithEventSideBar);
