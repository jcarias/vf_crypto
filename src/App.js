import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CurrenciesList from "./CurrenciesList";
import CurrencyDetails from "./CurrencyDetails";

const App = () => {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/details/:id">
          <CurrencyDetails />
        </Route>
        <Route path="/">
          <CurrenciesList />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
