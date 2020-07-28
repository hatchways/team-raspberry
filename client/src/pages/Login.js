import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  SvgIcon,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomTextField from "../components/CustomTextField";

export default function Login() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackBar] = useState({
    snackbarMsg: "",
    snackbarOpen: false,
  });
  const { email, password } = formValues;

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((res) => {
      res.json().then((data) => {
        setSnackBar({
          snackbarMsg: data.message,
          snackbarOpen: true,
        });

        if (res.status < 300 && res.status >= 200) {
          // TODO REDIRECTION
        }
      });
    });
  };

  const handleChange = (e) => {
    const target = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const snackbarClose = () => {
    setSnackBar({
      snackbarMsg: "",
      snackbarOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <Navbar type="login">Don't have an account?</Navbar>
      <Grid
        container
        spacing={0}
        className={classes.gridRoot}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={10} sm={7} md={6} lg={4}>
          <Paper className={classes.Paper}>
            <Typography variant="h5" className={classes.FormTitle}>
              Login
            </Typography>
            <form action="/login" method="POST" onSubmit={onSubmit}>
              <Grid
                item
                container
                spacing={2}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <CustomTextField
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <CustomTextField
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button className={classes.LoginButton} type="submit">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar.snackbarOpen}
        autoHideDuration={6000}
        onClose={snackbarClose}
        message={snackbar.snackbarMsg}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={snackbarClose}
            variant="outlined"
          >
            <SvgIcon component={CloseIcon}></SvgIcon>
          </Button>
        }
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridRoot: {
    // 64px is default height of app bar
    height: "calc(100vh - 64px)",
    background: "#F4F6FC",
  },
  AppBar: {
    background: "#ffffff",
  },
  Button: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderColor: "#3eb485",
  },
  title: {
    flexGrow: 1,
    color: theme.primary,
  },
  question: {
    flexGrow: 1,
    textAlign: "right",
    color: theme.primary,
  },
  FormTitle: {
    textAlign: "center",
    color: "#000000",
    marginBottom: "3rem",
    marginTop: "-1rem",
  },
  Paper: {
    padding: "4rem",
  },
  LoginButton: {
    background: "linear-gradient(90deg, #2DAA94 30%, #4CBC77 80%)",
    fontSize: "18px",
    height: "3rem",
    width: "100%",
    color: "white",
    textTransform: "capitalize",
    marginTop: "3rem",
  },
}));
