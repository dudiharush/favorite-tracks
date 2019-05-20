import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import "./App.css";
import { TrackPage } from "./components/TrackPage";

export const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/track/:trackId" component={TrackPage} />
        </Switch>
      </div>
    </Router>
  );
};
