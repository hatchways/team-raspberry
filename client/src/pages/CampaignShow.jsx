import React, { useEffect, useCallback, useState } from 'react';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CampaignStep from "../components/CampainStep";
import { makeStyles } from "@material-ui/core/styles";

export default function CampaignShow() {
  const [steps, addStep] = useState([])
  const classes = useStyles()

  const handleAddStep = () => {
    let newItem = (
    <ListItem key={steps.length + 1} className={classes.listItem}>
      <CampaignStep key={steps.length + 1}/>
    </ListItem>
    )
    addStep(steps.concat(newItem))
  }

  return (
    <div>
      
      <List >
        {steps}
      </List>
      <Button className={classes.button} onClick={handleAddStep}>Add Step</Button>
    </div>
  ) 
}

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {

  },
  button: {

  },
  listItem: {

  },
}))