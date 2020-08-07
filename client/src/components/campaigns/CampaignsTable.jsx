import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Auth from "../../services/auth-services";
import CampaignFormDialog from "./CampaignFormDialog";
import { CampaignContext } from "../../contexts/CampaignContext";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CampaignsTable(props) {
  const { campaigns } = useContext(CampaignContext);
  const classes = useStyles();

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
          {campaigns.map((row) => {

            return (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{new Date(row.created).toDateString()}</TableCell>
              <TableCell>{row.prospects}</TableCell>
              <TableCell>{row.replies}</TableCell>
              <TableCell>{row.steps}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
      <CampaignFormDialog onSubmit={props.onSubmitNew} />
    </TableContainer>
  );
}
