import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SimpleDialogDemo from "./pages/GmailAPI";
import Prospects from "./pages/Prospects";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/gmail" component={SimpleDialogDemo} />
          <Route path="/login" component={Login} />
          <Route path="/prospects" component={Prospects} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
