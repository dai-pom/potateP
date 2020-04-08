import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Home from "./features/home/containers/home";
import Login from "./features/login/containers/login";
import SignUp from "./features/signup/containers/signup";
import NavigationBar from "./features/navigataionBar/components/navigationBar";
import EventList from "./features/event/containers/eventList";
import EventOverview from "./features/event/containers/event_overview";
import schedule from "./features/event/containers/schedule";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route path={"/signup"} component={SignUp} />
            <Auth>
              <Switch>
                <div>
                  <NavigationBar />
                  <Route path={"/home"} component={Home} />
                  <Route exact path={"/events"} component={EventList} />
                  <Route exact path="/events/:eid" component={EventOverview} />
                  <Route
                    path="/events/:eid/schedule/:sid"
                    component={schedule}
                  />
                </div>
              </Switch>
            </Auth>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
