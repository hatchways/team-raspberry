import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { tinyMCEKey } from "../APIKeys";

export default function MyEditor() {
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  
  const handleSave = (content) => {
    
  }

  return(
    <Editor
      initialValue="<p>Initial content</p>"
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
  )
}


