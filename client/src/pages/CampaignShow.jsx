import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CampaignStep from "../components/CampaignStep";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import * as Auth from "../services/auth-services";

export default function CampaignShow() {
  const url = window.location.href.split("/");
  const campaignId = parseInt(url[url.length - 1]);
  const classes = useStyles();
  const location = useLocation();
  const [steps, addStep] = useState([]);
  const [stepJson, setStepJson] = useState([]);
  const [contacted, setContacted] = useState(0);
  const [key, setKey] = useState(0);
  const [opened, setOpened] = useState(0);
  const [replied, setReplied] = useState(0);
  const [campaignProspects, setCampaignProspects] = useState(null);
  const [currentCampaign, setCurrentCampaign] = useState(
    location.state.currentCampaign
  );

  console.log(currentCampaign.title)

  useEffect(() => {
    Auth.getCampaignSteps(campaignId)
      .then((response) => response.data)
      .then((data) => {
        const newSteps = [...data.steps];
        setStepJson(newSteps);
      });

    Auth.getCampaignProspects()
      .then((response) => response.data)
      .then((data) => {
        const responseData = [];
        console.log("Getting Campaign Prospects");
        data.CampaignProspects.forEach((element) => {
          if (currentCampaign.id === element.campaign_id) {
            responseData.push(element);
          }
        });
        console.log(responseData);
        setCampaignProspects(responseData);
      });
  }, []);

  const handleAddStep = () => {
    let newStep = (
      <ListItem key={steps.length + 1} className={classes.listItem}>
        <CampaignStep key={steps.length + 1} />
      </ListItem>
    );
    addStep(steps.concat(newStep));
  };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {currentCampaign.title}
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Contacted</TableCell>
              <TableCell align="center">Opened</TableCell>
              <TableCell align="center">Replied</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{contacted}</TableCell>
              <TableCell align="center">{opened}</TableCell>
              <TableCell align="center">{replied}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <List>
        {stepJson.map((json, idx) => {
          return (
            <ListItem key={idx + 1} className={classes.listItem}>
              <CampaignStep
                currentCampaign={currentCampaign}
                campaignProspects={campaignProspects}
                key={idx + 1}
                stepData={json}
                saved={true}
              />
            </ListItem>
          );
        })}
        {steps}
      </List>
      <Button
        className={classes.button}
        onClick={handleAddStep}
        variant="contained"
        color="primary"
      >
        Add Step
      </Button>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#F3F6FB",
  },
  title: {
    marginLeft: "66px",
    marginBottom: "10px",
    color: "linear-gradient(45deg, #2AA897 30%, #4FBE75 90%)",
  },
  button: {
    maxWidth: "100px",
    marginLeft: "66px",
  },
  listItem: {},
  tableContainer: {
    minWidth: 650,
    maxWidth: 800,
    marginLeft: "66px",
    marginRight: "50px",
    borderColor: "grey",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "4px",
    justifyContent: "space-around",
  },
  table: {},
  tableHead: {},
  tableHeadRow: {},
  tableHeadCell: {},
  tableBody: {},
  tableBodyRow: {},
  tableBodyCell: {},
}));
