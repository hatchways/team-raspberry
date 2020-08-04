import React, { useState, useEffect, useContext } from "react";
//import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, DialogTitle, Dialog } from "@material-ui/core";
import * as Auth from "../services/auth-services";
//import { UserContext } from "../contexts/UserContext";

function GmailDialog(props) {
  // future
  // const history = useHistory();
  // const { user, setUser } = useContext(UserContext);
  const { onClose, selectedValue, open } = props;
  const [authorization, setAuthorization] = useState(null);

  const handleClose = () => {
    onClose(selectedValue);
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
    <Dialog onClose={handleClose} aria-labelledby="gmail-title" open={open}>
      <DialogTitle id="gmail-title">Connect a Gmail Account</DialogTitle>
      <Button id="gmail-button" onClick={authorize}>
        Connect
      </Button>
    </Dialog>
  );
}

GmailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function GmailDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Authorize Gmail
      </Button>
      <GmailDialog open={open} onClose={handleClose} />
    </div>
  );
}
