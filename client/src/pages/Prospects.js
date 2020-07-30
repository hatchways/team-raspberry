import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import ProspectsTable  from '../components/prospects/Table';
import {Button, Grid, IconButton, Snackbar, Typography, Container} from "@material-ui/core";

export default function Prospects() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Grid container spacing={3}>
              <Grid item className={classes.sidebar} sm={2}>
                  Sidebar
              </Grid>
              <Grid item sm={10}>
                  <Container className={classes.contentContainer}>
                      <Grid item className={classes.contentHeader} sm={12}>
                          Content Header
                      </Grid>
                      <Grid item className={classes.content} sm={12}>
                          <ProspectsTable/>
                      </Grid>
                  </Container>
              </Grid>
          </Grid>
      </div>
  );
}

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    // 64px is default height of app bar
    height: "calc(100vh - 64px)",
    background: "#F4F6FC",
  },
  sidebar: {
    },
  content: {
    },
  contentContainer: {
    },
  contentHeader: {
    },
}));