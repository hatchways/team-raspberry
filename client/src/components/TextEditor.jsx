import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { tinyMCEKey } from "../APIKeys";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

export default function TextEditor(props) {
  const classes = useStyles()
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  let { onClose, selectedValue, open } = props


  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setContent(content)
  };

  const handleClose = () => {
    onClose(selectedValue)
  }
  
  const handleSave = (e) => {
    e.preventDefault()
    console.log(e)
    // const template = JSON.stringify({ title, subject, content });
    // fetch("/api/templates", {
    //   method: "POST",
    //   data: template,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => response.json().then((data) => console.log(data)));
  }

  return(
    <Dialog open={open}>
      <DialogTitle>New Email</DialogTitle>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSave}>
        <TextField key="subject" label="Email Subject" onChange={setSubject}></TextField>
        <Editor
          // initialValue="<p>Initial content</p>"
          apiKey={tinyMCEKey}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help",
          }}
          onChange={handleEditorChange}
        />
        <Button label="Submit" type="submit">Save Template</Button>
      </form>
    </Dialog>
  )
}

TextEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {

  },
  dialogTitle: {

  },
  title: {

  },
  subject: {

  },
  editor: {

  },
  button: {

  }
}))