import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CurrenciesList from "./CurrenciesList";
import CurrencyDetails from "./CurrencyDetails";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
