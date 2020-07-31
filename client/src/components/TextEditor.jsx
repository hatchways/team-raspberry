import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { tinyMCEKey } from "../APIKeys";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

export default function TextEditor(props) {
  const classes = useStyles()
  const [subject, handleSubject] = useState("")
  const [content, handleContent] = useState("")
  let { open, setOpenEditor ,setEditorSubject, setEditorContent } = props


  // const handleEditorChange = (content, editor) => {
  //   console.log("Content was updated:", content);
  //   console.log("Editor: ", editor)
  // };

  const handleEditorChange = (cont, _) => {
    handleContent(cont)
    // console.log(content)
  };
  
  const handleSubjectChange = (e) => {
    handleSubject(e.target.value)
    // console.log(subject)
  }
  
  const handleClose = () => {
    handleSubject("")
    handleContent("")
    setOpenEditor(false)
  }

  const handleSave = () => {
    if (subject.length > 0 && content.length > 0) {
      setOpenEditor(false)
      setEditorSubject(subject)
      setEditorContent(content)
    } else {
      alert("Either the email subject or body is empty.")
    }
  }

  return(
    <Dialog open={open} className={classes.root}>
      {/* <DialogTitle>New Email</DialogTitle> */}
        <Card>
          <CardContent>
            <TextField className={classes.subject} key="subject" label="Email Subject" value={subject} onChange={handleSubjectChange}></TextField>
          </CardContent>
          <CardContent>
            <Editor
              // initialValue="<p>Initial content</p>"
              apiKey={tinyMCEKey}
              init={{
                height: 300,
                width: "90%",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | \
                      alignleft aligncenter alignright | \
                      bullist numlist outdent indent | help",
              }}
              value={content}
              onEditorChange={handleEditorChange}
            />
          </CardContent>
          {/* <Button label="Submit" type="submit">Save Template</Button> */}
          <CardActions>
            <Button onClick={handleSave} variant="contained" color="primary">Save Template</Button>
          </CardActions>
          <CardActions>
            <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
          </CardActions>
        </Card>
    </Dialog>
  )
}

TextEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90%",
    width: "90%",
    minHeight: "600px",
    display: "flex",
    justifyContent: "center",
  },
  dialogTitle: {

  },
  title: {

  },
  subject: {
    width: "90%",
    margin: "auto",
  },
  editor: {
    margin: "auto",
  },
  button: {

  }
}))