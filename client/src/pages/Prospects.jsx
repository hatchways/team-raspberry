import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import ProspectsTable  from '../components/prospects/Table';
import {Button, Grid, IconButton, Snackbar, Typography, Container} from "@material-ui/core";
import SearchBar from '../components/prospects/SearchBar'
import { Autocomplete } from '@material-ui/lab';
import {MuiThemeProvider} from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import CustomTextField from "../components/CustomTextField";


export default function Prospects() {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.sidebar} sm={2}>
          Sidebar
          <SearchBar/>
        </Grid>
        <Grid item sm={10}>
          <Container className={classes.contentContainer}>
            <Grid item className={classes.contentHeader} sm={12}>
              Content Header
              <button onClick={Test}>
                Click me!
              </button>
            </Grid>
            <Grid item className={classes.content} sm={12}>
              <ProspectsTable/>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

function Test() {
  fetch("/api/prospects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // TODO: This should be pulled from the local storage? or at least passed in.
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYxMzQ0MDcsImlhdCI6MTU5NjEzMDgwNywic3ViIjoxfQ.oWl5mzQFt8olxEM9sQO2nLu2eKsPI-p-JVIW-Y1ai7E"
    }
  }).then((res) => {
    res.json().then((data) => {
      console.log(data)
      // setProspects({
      //   prospects: data.id
      // });
    });
  });
}

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    // 64px is default height of app bar
    height: "calc(100vh - 64px)",
    background: "#F4F6FC",
  },
  sidebar: {},
  content: {},
  contentContainer: {},
  contentHeader: {},
  input: {}
}));