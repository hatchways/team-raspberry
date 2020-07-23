import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

export default function GmailDialog(props) {
  const classes = useStyles()
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="gmail-title" open={open}>
      <DialogTitle id="gmail-title">Connect a Gmail Account</DialogTitle>
      <Button id="gmail-button">
        {/* <img src="/public/google_signin_buttons/web/"/> */}
      </Button>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  Dialog: {
    background: '#ffffff',
  },
  DialogTitle: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderColor: '#3eb485'
  },
  Button: {
    color: 'black',
    textTransform: 'uppercase',
  },
})); 