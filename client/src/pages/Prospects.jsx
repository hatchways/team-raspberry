import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import ProspectsTable  from '../components/prospects/Table';
import {Button, Grid, IconButton, Snackbar, Typography, Container} from "@material-ui/core";
import SearchBar from '../components/prospects/SearchBar'


export default function Prospects() {
  const classes = useStyles();

   const [text, setText] = useState();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.sidebar} sm={2}>
          <SearchBar setText={setText}/>
        </Grid>
        <Grid item sm={10}>
          <Container className={classes.contentContainer}>
            <Grid item className={classes.contentHeader} sm={12}>
            </Grid>
            <Grid item className={classes.content} sm={12}>
              <ProspectsTable text={text}/>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    // 64px is default height of app bar
    height: "calc(100vh - 64px)",
    background: "#F4F6FC",
  },
  LoginButton: {
    background: "linear-gradient(90deg, #2DAA94 30%, #4CBC77 80%)",
    fontSize: "18px",
    height: "3rem",
    // width: "100%",
    color: "white",
    textTransform: "capitalize",
    marginTop: "3rem"
  },
  sidebar: {},
  content: {},
  contentContainer: {},
  contentHeader: {},
  input: {}
}));