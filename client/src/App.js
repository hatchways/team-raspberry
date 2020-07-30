import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import GmailDialog from "./pages/GmailDialog";
import GmailRedirect from "./pages/GmailRedirect";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProspects from "./pages/AddProspects";
import LoggedInNavBar from './pages/LoggedInNavBar';
import Profile from './pages/ProfilePage';
import Reporting from './pages/Reporting';
import Templates from './pages/Templates';
import Prospects from './pages/Prospects';
import Campaigns from './pages/Campaigns';

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <LoggedInNavBar />
        <Route path="*/authorize" component={GmailDialog} />
        <Route path="*/redirect" component={GmailRedirect} />
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/prospects/add" component={AddProspects}></Route>
          <Route path="/prospects" component={Prospects} />
          <Route path="/reporting" component={Reporting} />
          <Route path="/templates" component={Templates} />
          <Route path="/profile" component={Profile} />
          <Route path="/campaigns" component={Campaigns} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
