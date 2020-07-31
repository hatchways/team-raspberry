import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import TextEditor from "./TextEditor";
import { theme } from "../themes/theme";


export default function CampaignStep() {
  const classes = useStyles(theme);
  const [stepName, setStepName] = useState("")
  const [saved, setSaved] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const [editorSubject, setEditorSubject] = useState("")
  const [editorContent, setEditorContent] = useState("")

  useEffect(() => {
    console.log(editorSubject)
    console.log(editorContent)
  }, [editorSubject, editorContent])

  const handleEditorOpen = () => {
    setOpenEditor(true)
  }

  const handleEditorClose = () => {
    setOpenEditor(false)
  }

  const handleEdit = () => {
    setSaved(false)
  }

  const handleText = (e) => {
    setStepName(e.target.value)
  }

  const handleSave = () => {
    // e.preventDefault()
    setSaved(true)
    // console.log(e)
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
        <Button onClick={handleEdit} variant="contained" color="primary">Edit</Button>
      </CardActions>
    </Card>
  ) : (
    <Card>
      {/* </Card> */}
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
      {/* </form> */}
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

  },
  cardContent: {

  },
  cardActions: {

  },
}))