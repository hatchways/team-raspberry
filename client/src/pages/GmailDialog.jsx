import React, { useState, useEffect, useContext } from "react";
//import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, DialogTitle, Dialog } from "@material-ui/core";
import * as Auth from "../services/auth-services";
//import { UserContext } from "../contexts/UserContext";

export default function GmailDialog(props) {
  // future
  // const history = useHistory();
  // const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  const onClose = props.onClose;
  const [authorization, setAuthorization] = useState(null);

  const handleClose = () => {
    onClose();
  };

  const authorize = async () => {
    const response = Auth.authPost();
    const data = await response.then((data) => {
      return data.data;
    });
    setAuthorization(data);
  };

  useEffect(() => {
    // This will be used to check if user already has credentials or not
    /*
    if (user.credentials !== null) {
      history.push("/prospects");
    }*/
    if (authorization !== null) {
      window.location.assign(authorization.url);
    }
  }, [authorization]);

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      aria-labelledby="gmail-title"
      open={open}
    >
      <DialogTitle className={classes.title} id="gmail-title">
        Connect a Gmail Account
      </DialogTitle>
      <Button className={classes.button} id="gmail-button" onClick={authorize}>
        Connect
      </Button>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: "auto",
    color: "red",
    "& h6": {
      color: "red",
    },
  },
  button: {
    margin: "auto",
    transform: "scale(1)",
  },
}));