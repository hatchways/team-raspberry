import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import GmailDialog from "./pages/GmailDialog";
import LoggedInNavBar from "./pages/LoggedInNavBar";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LoggedInNavBar} />
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route path="/authorize" component={GmailDialog} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
