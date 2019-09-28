import React, { Component, useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewComponent from "./components/NewComponent";
import { connect } from "react-redux";
import { getComponents } from "./actions/BackendActions";
import ComponentDetails from "./components/ComponentDetails";
import history from "./history";
import { ComponentsChartDetails } from "./components/ComponentsChartDetails";
import { ErrorComponent } from "./components/ErrorComponent";

const App = props => {
  useEffect(() => {
    const { getComponents } = props;
    getComponents();
  }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact={true} component={Dashboard} />
        <Route path="/components" exact={true} component={Dashboard} />
        <Route path="/components/new" exact={true} component={NewComponent} />
        <Route
          path="/component/:id"
          exact={true}
          render={props => <ComponentDetails {...props} />}
        />
        <Route path="/error" exact={true} component={ErrorComponent} />
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = () => {
  return {
    getComponents
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
