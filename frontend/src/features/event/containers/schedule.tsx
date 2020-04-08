import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Schedule } from "../components/schedule";
import { AppState } from "../../../store";

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: AppState) => ({
  schedule: state.schedule
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Schedule)
);
