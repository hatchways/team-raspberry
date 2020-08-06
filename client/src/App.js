import React, { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import { createBrowserHistory } from "history";
import GmailDialog from "./pages/GmailDialog";
import GmailRedirect from "./pages/GmailRedirect";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoggedInNavBar from "./pages/LoggedInNavBar";
import Reporting from "./pages/Reporting";
import Templates from "./pages/Templates";
import Prospects from "./pages/Prospects";
import Campaigns from "./pages/CampaignsIndex";
import AddProspects from "./pages/AddProspects";
import * as Auth from "./services/auth-services";
import CampaignShow from "./pages/CampaignShow";


import "./App.css";

function App() {
  const history = createBrowserHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const response = Auth.getUser();

      response.then((data) => {
        setUser(data.data.user);
      });
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {user !== null ? <LoggedInNavBar /> : ""}
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/camp_show" component={CampaignShow}/>
          <Switch>
            <Route path="/" exact>
              {user !== null ? <Redirect to="/prospects" /> : <Signup />}
            </Route>
            <Route path="/login">
              {user !== null ? <Redirect to="/prospects" /> : <Login />}
            </Route>
            <Route path="/prospects">
              {user !== null ? <Prospects /> : <Login />}
            </Route>
            <Route path="/reporting">
              {user !== null ? <Reporting /> : <Login />}
            </Route>
            <Route path="/templates">
              {user !== null ? <Templates /> : <Login />}
            </Route>
            <Route path="/campaigns">
              {user !== null ? <Campaigns /> : <Login />}
            </Route>
            <Route path="/campaign/:id">
              {user !== null ? <CampaignShow /> : <Login />}
            </Route>
            <Route path="/add/prospects">
              {user !== null ? <AddProspects /> : <Login />}
            </Route>
            <Route path="*/authorize" component={GmailDialog}>
              {user !== null ? <GmailDialog /> : <Redirect to="/login" />}
            </Route>
            <Route path="*/redirect" component={GmailRedirect}>
              {user !== null ? <GmailRedirect /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
