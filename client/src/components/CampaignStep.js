import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import TextEditor from "./TextEditor";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { theme } from "../themes/theme";
import axios from "axios";


export default function CampaignStep() {
  const classes = useStyles(theme);
  const [stepName, setStepName] = useState("")
  const [saved, setSaved] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [editorSubject, setEditorSubject] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [stepId, setStepId] = useState(null)

  const handleEditorOpen = () => {
    setOpenEditor(true)
  }

  const handleEditorClose = () => {
    setOpenEditor(false)
  }

  const handleAlertClose = () => {
    setOpenAlert(false)
  }

  const handleEdit = () => {
    setSaved(false)
  }

  const handleText = (e) => {
    setStepName(e.target.value)
  }

  const handleEmail = (e) => {
    // Make sure there are actually prospects to send an email to.
  }

  const handleSave = () => {
    if (stepName.length > 0 && editorSubject.length > 0) {
      setSaved(true)
    } else {
      setOpenAlert(true)
    }
    
  }

  // NOTE: consider adding a ListItem wrapper to these, so it doesn't need to be added in CampaignShow.
  return saved ? (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        Step Name: {stepName}
      </CardContent>
      <CardContent className={classes.cardContent}>
        Subject: {editorSubject}
      </CardContent>
      <CardContent className={classes.cardContent}>
        Content: {editorContent}
      </CardContent>
      <CardActions>
        <Button onClick={handleEmail} variant="contained" color="primary">Send to Prospects</Button>
        <Button onClick={handleEdit} variant="contained" color="primary">Edit</Button>
      </CardActions>
    </Card>
  ) : (
    <Card className={classes.card}>
        <CardContent>
          <TextField
            label="Step Name"
            id="step-name"
            value={stepName}
            onChange={handleText}
            className={classes.text}
          ></TextField>
        </CardContent>
        {
          editorSubject.length === 0 ?
          <CardActions>
            <Button className={classes.button} onClick={handleEditorOpen} variant="contained" color="primary">
              Create Email
            </Button>
            <TextEditor
              open={openEditor}
              onClose={handleEditorClose}
              setEditorSubject={setEditorSubject}
              setEditorContent={setEditorContent}
              setOpenEditor={setOpenEditor}
            />
          </CardActions>
          :
          <CardContent className={classes.cardContent}>
            Subject: {editorSubject}
            <br/>
            Content: {editorContent}
          </CardContent>
        }
        <CardActions>
          <Button className={classes.button} label="Submit" type="submit" variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </CardActions>
        <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        >
        <DialogTitle id="alert-dialog-title">{"A step needs a title and email template."}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {

  },
  text: {

  },
  select: {
    width: "120px",
  },
  button: {

  },
  card: {
    minWidth: 650,
    marginLeft: "50px",
    marginRight: "50px",
    borderColor: "grey",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "4px",
  },
  cardContent: {

  },
  cardActions: {

  },
}))