import { withRouter } from "react-router";
import { EventList } from "../components/eventList";
import { connect } from "react-redux";

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventList)
);
