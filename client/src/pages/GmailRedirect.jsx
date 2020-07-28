import React, { useCallback, useEffect } from "react";
import QueryString from "query-string";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function GmailRedirect(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const query = QueryString.parseUrl(window.location.href)
    const data = JSON.stringify({ url: window.location.href, redirect_url: query.url })
    fetch("/api/oauth2callback", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json().then((data) => console.log(query)));
  }, []);

  return (
    <Dialog onClose={handleClose} aria-labelledby="gmail-title" open={open}>
      <DialogTitle id="gmail-title">Gmail Connected Successfully</DialogTitle>
      <Button variant="outlined" color="primary" onClick={handleClose}>
        Check Query
      </Button>
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
