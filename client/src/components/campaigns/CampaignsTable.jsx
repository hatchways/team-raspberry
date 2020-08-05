import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Auth from "../../services/auth-services"
import CampaignFormDialog from "./CampaignFormDialog";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button, Grid
} from "@material-ui/core"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CampaignsTable(props) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  function fetchCampaigns() {
    Auth.getCampaigns().then((res) => {
      setRows(res.data.campaigns);
    });

  }

  useEffect(() => {
      fetchCampaigns();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={"stuff"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Prospects</TableCell>
            <TableCell>Replies</TableCell>
            <TableCell>Steps</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.prospects}</TableCell>
              <TableCell>{row.replies}</TableCell>
              <TableCell>{row.steps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <CampaignFormDialog/>
    </TableContainer>
  );
}
