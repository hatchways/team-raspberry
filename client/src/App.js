import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import GmailDialog from "./pages/GmailDialog";
import GmailRedirect from "./pages/GmailRedirect";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="*/authorize" component={GmailDialog} />
        <Route path="*/redirect" component={GmailRedirect} />
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
