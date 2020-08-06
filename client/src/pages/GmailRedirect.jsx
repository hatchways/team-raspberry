import React, { useEffect, useContext, useState } from "react";
import QueryString from "query-string";
import PropTypes from "prop-types";
import { Button, DialogTitle, Dialog } from "@material-ui/core";
import * as Auth from "../services/auth-services";
import { UserContext } from "../contexts/UserContext";

function GmailRedirect(props) {
  const { onClose, selectedValue, open } = props;
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const sendEmail = async () => {
    const requestBody = {
      userEmail: user.email,
      credentials: JSON.parse(user.credentials),
    };
    const data = await Auth.sendEmail(requestBody);
    // Just so u can see if the email is sending
    console.log(data);
  };

  useEffect(() => {
    if (user.credentials === null) {
      const body = {
        url: window.location.href,
        userId: user.userId,
      };

      const response = Auth.oauthPost(body);
      response.then((data) => {
        setUser((prevState) => ({
          ...prevState,
          credentials: data.data.credentials,
        }));
      });
    }
  }, []);

  return (
    <Dialog onClose={handleClose} aria-labelledby="gmail-title" open={open}>
      <DialogTitle id="gmail-title">Gmail Connected Successfully</DialogTitle>
      <Button variant="outlined" color="primary" onClick={handleClose}>
        Check Query
      </Button>
      <Button onClick={sendEmail}>SEND AN EMAIL TEST!</Button>
    </Dialog>
  );
}

GmailRedirect.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function GmailRedirectDemo() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Check your Query nao
      </Button>
      <GmailRedirect open={open} onClose={handleClose} />
    </div>
  );
}
