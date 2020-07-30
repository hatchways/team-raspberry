import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";


export default function CampaignStep() {
  const classes = useStyles();
  const [stepName, setStepName] = useState("")
  const [templates, setTemplates] = useState([])
  const [saved, setSaved] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(
    <MenuItem key="0">Select Template</MenuItem>
  );

  const handleEdit = () => {
    setSaved(false)
  }

  const handleText = (e) => {
    setStepName(e.target.value)
  }

  const handleSelect = (e) => {
    setSelectedTemplate(e.target.value)
  }

  // TODO: move to CampaignShow and pass in as props so only 1 http request needs to be made. As it is now, an HTTP request will be made each time a step is added.
  const fetchTemplateTitles = useEffect(() => {
    // fetch("/templates", {
    //   method: "GET",
    // }).then((response) => response.json().then(data => {
    //   titlesToMenuItems(data.titles)
    // }))
  }, [])

  const titlesToMenuItems = (templates) => {
    templates.map((template) => {
      return <MenuItem key={template} value="template">{template}</MenuItem>
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
    saved ? 
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          Step Name: {stepName}
        </CardContent>
        <CardContent className={classes.cardContent}>
          Template: {selectedTemplate}
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit}>Edit</Button>
        </CardActions>
      </Card>
    :
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="step-name">Step Name:</InputLabel>
        <Input id="step-name" value={stepName} onChange={handleText} className={classes.text}/>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="template-select-label" id="template-select-label" >Select Template</InputLabel>
        <Select labelid="template-select-label" id="template-select" value={selectedTemplate} onChange={handleSelect} className={classes.select}>
          <MenuItem key="1" value="Template 1">Template 1</MenuItem>
          <MenuItem key="2" value="Template 2">Template 2</MenuItem>
          {templates}
        </Select>
      </FormControl>
      <Button className={classes.button} label="Submit" type="submit">Save</Button>
    </form>
  )
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