import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import * as Auth from "../services/auth-services";
import { CampaignContext } from "../contexts/CampaignContext";
import { UserContext } from "../contexts/UserContext";
import GmailDialog from "../pages/GmailDialog";
import { CampaignStepsContext } from "../contexts/CampaignStepsContext";

export default function CampaignStep(props) {
  const classes = useStyles(theme);
  const [stepName, setStepName] = useState("");
  const [saved, setSaved] = useState(props.saved);
  const [openEditor, setOpenEditor] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [editorSubject, setEditorSubject] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [stepId, setStepId] = useState(null);
  const url = window.location.href.split("/");
  const campaignId = parseInt(url[url.length - 1]);

  const [showGmail, setShowGmail] = useState(false);
  const { user } = useContext(UserContext);
  const { stepsWithProspects, addStepsWithProspects } = useContext(
    CampaignStepsContext
  );
  const [prospectCount, setProspectCount] = useState(0);

  const handleGmailClose = () => {
    setShowGmail(false);
  };

  useEffect(() => {
    if (props.stepData) {
      const stepData = props.stepData;
      setStepName(stepData.step_name);
      setEditorSubject(stepData.email_subject);
      setEditorContent(stepData.email_body);
      setStepId(stepData.id);
      setProspectCount(
        stepsWithProspects[props.stepIndex - 1].prospects.length
      );
    }
  }, [stepsWithProspects]);

  const handleEditorOpen = () => {
    setOpenEditor(true);
  };

  const handleEditorClose = () => {
    setOpenEditor(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleEdit = () => {
    setSaved(false);
  };

  const handleText = (e) => {
    setStepName(e.target.value);
  };

  const handleEmail = (e) => {
    // Make sure there are actually prospects to send an email to.
    if (user.credentials === null) {
      setShowGmail(true);
      return;
    }

    if (stepsWithProspects[props.stepIndex - 1].prospects.length > 0) {
      const body = {
        credentials: user.credentials,
        prospects: props.campaignProspects,
        email_subject: editorSubject,
        email_body: editorContent,
        step_prospects: stepsWithProspects[props.stepIndex - 1].prospects,
      };
      Auth.sendEmail(body);
    }
  };

  const handleProspectMove = async () => {
    // Check if there are no prospects associated
    // with any step
    let stepCount = 0;
    stepsWithProspects.forEach((element) => {
      if (element.prospects.length === 0) stepCount++;
    });

    if (stepCount === stepsWithProspects.length) {
      Auth.addProspectsToStep({
        step_id: stepId,
        prospects: props.prospects.prospects,
      }).then((response) => {
        let tempStepProspects = stepsWithProspects;
        tempStepProspects[props.stepIndex - 1].prospects =
          response.data.prospects;

        addStepsWithProspects(tempStepProspects);
        setProspectCount(response.data.prospects.length);
      });
    } else {
      if (stepsWithProspects[props.stepIndex - 2] === undefined) return;
      if (stepsWithProspects[props.stepIndex - 2].prospects.length === 0)
        return;
      if (
        stepsWithProspects[props.stepIndex - 2].prospects[0].email_sent ===
        false
      )
        return;
      // Probably don't need this check
      if (stepsWithProspects[props.stepIndex - 2].prospects.length > 0) {
        const body = {
          prospects: stepsWithProspects[props.stepIndex - 2].prospects,
          old_step_id: stepsWithProspects[props.stepIndex - 2].stepId,
          new_step_id: stepId,
          old_index: props.stepIndex - 2,
          new_index: props.stepIndex - 1,
          steps_with_prospects: stepsWithProspects,
        };
        console.log("MOVING THE PROSPECTS!");
        const response = await Auth.moveProspectsToStep(body);
        addStepsWithProspects(response.data.step_prospects);
      }
    }
  };

  const handleSave = () => {
    if (stepName.length > 0 && editorSubject.length > 0) {
      Auth.createStep({
        step_name: stepName,
        email_subject: editorSubject,
        email_body: editorContent,
        campaign_id: campaignId,
      });
      setSaved(true);
    } else {
      setOpenAlert(true);
    }
  };

  // NOTE: consider adding a ListItem wrapper to these, so it doesn't need to be added in CampaignShow.
  return saved ? (
    <div>
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

        <CardContent className={classes.cardContent}>
          Prospect(s) count: {prospectCount}
        </CardContent>

        <CardActions>
          <Button onClick={handleEmail} variant="contained" color="primary">
            Send to Prospects
          </Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Edit
          </Button>
          <Button
            onClick={handleProspectMove}
            variant="contained"
            color="primary"
          >
            Move Prospect To Next Step
          </Button>
        </CardActions>
      </Card>
      {showGmail === true ? (
        <GmailDialog open={showGmail} onClose={handleGmailClose} />
      ) : (
        ""
      )}
    </div>
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
      {editorSubject.length === 0 ? (
        <CardActions>
          <Button
            className={classes.button}
            onClick={handleEditorOpen}
            variant="contained"
            color="primary"
          >
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
      ) : (
        <CardContent className={classes.cardContent}>
          Subject: {editorSubject}
          <br />
          Content: {editorContent}
        </CardContent>
      )}
      <CardActions>
        <Button
          className={classes.button}
          label="Submit"
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </CardActions>
      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"A step needs a title and email template."}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleAlertClose}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {},
  select: {
    width: "120px",
  },
  button: {},
  card: {
    minWidth: 650,
    marginLeft: "50px",
    marginRight: "50px",
    borderColor: "grey",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "4px",
  },
  cardContent: {},
  cardActions: {},
}));
