import { AppState } from "../../../store";
import { withRouter } from "react-router";

import { NavigationBar } from "../components/navigationBar";
import { connect } from "react-redux";

const mapStateToProps = (AppState: AppState) => ({
  user: AppState.user,
});

// export default withRouter(connect(mapStateToProps)(NavigationBar));
export default connect(mapStateToProps)(NavigationBar);
