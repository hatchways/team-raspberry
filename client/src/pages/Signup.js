import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomTextField from "../components/CustomTextField";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import * as Auth from "../services/auth-services";

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    repeatPassword: "",
    passwordError: "",
    repeatPasswordError: "",
    emailError: "",
  });
  const [snackbar, setSnackbar] = useState({
    snackbarMsg: "",
    snackbarOpen: false,
  });
  const {
    email,
    password,
    firstName,
    lastName,
    repeatPassword,
    passwordError,
    repeatPasswordError,
    emailError,
  } = formValues;

  const validate = () => {
    let valid = true;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = {
      passwordError: "",
      repeatPasswordError: "",
      emailError: "",
    };

    if (password.length < 6) {
      errors.passwordError = "Password must be atleast 6 characters";
      valid = false;
    }

    if (password !== repeatPassword) {
      errors.repeatPasswordError = "Required: Passwords must match";
      valid = false;
    }

    if (!re.test(email)) {
      errors.emailError = "Incorrect email format";
      valid = false;
    }

    setFormValues((prevState) => ({
      ...prevState,
      ...errors,
    }));

    return valid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const valid = validate();

    if (valid) {
      const register = {
        email: formValues.email,
        password: formValues.password,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      };
      const response = Auth.registration(register);

      response.then((data) => {
        setSnackbar({
          snackbarMsg: data.data.message,
          snackbarOpen: true,
        });

        if (data.data.status === "success") {
          localStorage.setItem("token", data.data.auth_token);
          setUser(data.data.user);
          history.push("/campaigns");
        }
      });
    }
  };

  const handleChange = (e) => {
    const target = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const snackbarClose = () => {
    setSnackbar({
      snackbarMsg: "",
      snackbarOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <Navbar type="signup">Already have an account?</Navbar>
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
              Signup
            </Typography>
            <form action="/api/registration" method="POST" onSubmit={onSubmit}>
              <Grid
                item
                container
                spacing={2}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <CustomTextField
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <CustomTextField
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <CustomTextField
                    name="email"
                    label="Your Email"
                    type="email"
                    value={email}
                    error={emailError.length === 0 ? false : true}
                    helperText={emailError}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <CustomTextField
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    error={passwordError.length === 0 ? false : true}
                    helperText={passwordError}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <CustomTextField
                    name="repeatPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatPassword}
                    error={repeatPasswordError.length === 0 ? false : true}
                    helperText={repeatPasswordError}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button className={classes.SignupButton} type="submit">
                    Create
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
          <IconButton
            className={classes.snackBarButton}
            aria-label="close"
            onClick={snackbarClose}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
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
  SignupButton: {
    background: "linear-gradient(90deg, #2DAA94 30%, #4CBC77 80%)",
    fontSize: "18px",
    height: "3rem",
    width: "100%",
    color: "white",
    textTransform: "capitalize",
    marginTop: "3rem",
  },
  snackBarButton: {
    color: "white",
  },
}));
