import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import GmailDialog from "./pages/GmailDialog";
import GmailRedirect from "./pages/GmailRedirect";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="*/authorize" component={GmailDialog} />
        <Route path="*/redirect" component={GmailRedirect} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
