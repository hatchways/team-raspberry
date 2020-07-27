import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function GmailDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const sendRequest = useEffect(async () => {

  // }, [url])

  const activateRequest = useCallback(async () => {
    fetch('/gotoauthorize', { mode: 'cors', redirect: 'follow' }).then(response => response.json()
      .then(() => handleClose()))
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