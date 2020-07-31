import React, { useEffect, useCallback, useState } from 'react';
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
import Typography from "@material-ui/core/Typography"

export default function CampaignShow() {
  const [steps, addStep] = useState([])
  const [contacted, setContacted] = useState(35)
  const [opened, setOpened] = useState(30)
  const [replied, setReplied] = useState(3)
  const classes = useStyles()

  // const createData = (contacted, opened, replied) => {
  //   return {contacted, opened, replied}
  // }

  // const row = createData(contacted, opened, replied)

  const handleAddStep = () => {
    let newItem = (
    <ListItem key={steps.length + 1} className={classes.listItem}>
      <CampaignStep key={steps.length + 1}/>
    </ListItem>
    )
    addStep(steps.concat(newItem))
    console.log(steps)
  }

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h4">Campaign 1</Typography>
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
      <List>{steps}</List>
      <Button className={classes.button} onClick={handleAddStep} variant="contained" color="primary">
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