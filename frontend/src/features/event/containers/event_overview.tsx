import { withRouter } from "react-router";
import { connect } from "react-redux";
import { EventOverview } from "../components/event_overview";

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventOverview)
);
