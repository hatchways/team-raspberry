import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

export default function CampaignStep() {
  const classes = useStyles();
  const [stepName, setStepName] = useState("Step 1")
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState()
  const [saved, setSaved] = useState(false)


  const handleText = (e) => {
    setStepName(e.target.value)
  }

  const handleSelect = (e) => {
    setSelectedTemplate(e.target.value)
  }

  // TODO: move to CampaignShow and pass in as props so only 1 http request needs to be made. As it is now, an HTTP request will be made each time a step is added.
  const fetchTemplateTitles = useEffect(() => {
    fetch("/templates", {
      method: "GET",
    }).then((response) => response.json().then(data => {
      titlesToMenuItems(data.titles)
    }))
  }, [])

  // NOTE: May need to switch from map to give each MenuItem a unique key.
  const titlesToMenuItems = (templates) => {
    templates.map((template) => {
      return <MenuItem>{template}</MenuItem>
    })
    setTemplates(templates)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    console.log(e)
  }

  // NOTE: consider adding a ListItem wrapper to these, so it doesn't need to be added in CampaignShow.
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="step-name">Step Name:</InputLabel>
        <Input id="step-name" value={stepName} onChange={handleText} className={classes.text}/>
      </FormControl>
      <InputLabel id="template-select-label" >Choose Email Template</InputLabel>
      <Select labelId="template-select-label" id="template-select" value={selectedTemplate} onChange={handleSelect} className={classes.select}>
        {templates}
      </Select>
      <Button className={classes.button} label="Submit" type="submit"/>
    </form>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {

  },
  text: {

  },
  select: {

  },
  button: {

  },
}))