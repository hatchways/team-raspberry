import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import GoogleButton from 'react-google-button';
import { makeStyles } from '@material-ui/core/styles';

function GmailDialog(props) {
  const classes = useStyles;
  const { onClose, selectedValue, open } = props;
  const redirect_url = JSON.stringify({redirect_url: window.location.href});
  const [auth_url, setAuth] = useState("")
  const TEST_USER = {
  "id": 1,
  "first_name": "Kevin",
  "last_name": "Kaminski",
  "email": "kaminskikeving@gmail.com",
  "credentials": false
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const activateRequest = useCallback(async () => {
    fetch("/api/authorize", {
      method: "post",
      body: redirect_url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        response.json().then((data) => {
          console.log(data.url)
          setAuth(data.url)
          window.location.href = data.url
        }))
  }, [])

  const activateOauth2Callback = useCallback(async () => {

    fetch("/api/oauth2callback", {
      method: "POST",
      body: {auth_url, redirect_url},
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json().then(
        (data) => {
          console.log(data)
          TEST_USER.credentials = data
        }
      ));
  }, [auth_url])

  return (
    <Dialog className={classes.root} onClose={handleClose} aria-labelledby="gmail-title" open={open}>
      <DialogTitle id="gmail-title" className={classes.title}>Connect a Gmail Account</DialogTitle>
      Connect a Gmail account to access all of MailSender's features.
      <GoogleButton className={classes.button} onClick={activateRequest}/>
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

 const useStyles = makeStyles({
   root: {
     display: "flex",
     margin: "auto",
     justifyContent: "center",
     alignItems: "center",
     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
   },
   title: {
     margin: "auto",
     color: "red",
   },
   button: {
     margin: "auto",
   },
 });