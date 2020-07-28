import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function GmailDialog(props) {
  const { onClose, selectedValue, open } = props;
  const redirect_url = JSON.stringify({redirect_url: window.location.href});

  const handleClose = () => {
    onClose(selectedValue);
  };

  const activateRequest = useCallback(async () => {
    fetch("/api/getauthorizationurl", {
      method: "POST",
      body: redirect_url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        response.json().then((data) => {
          window.location.href = data.url
        }))
  }, [])

  return (
    <Dialog onClose={handleClose} aria-labelledby="gmail-title" open={open}>
      <DialogTitle id="gmail-title">Connect a Gmail Account</DialogTitle>
      <Button id="gmail-button" onClick={activateRequest}>
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