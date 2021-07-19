import React, { Component } from "react";
import Login from "./components/Login";
import CustomerLogin from "./components/CustomerLogin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/employee/signin">
              <Login signInType="em" />
            </Route>
            <Route exact path="/signin">
              <CustomerLogin />
            </Route>
            <Route path="/**" render={() => <h2>Not found</h2>}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
