import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, email) {
  return { name, email };
}

const rows = [
  createData('Kim', 'kim@fakeemail.com'),
  createData('Kim', 'kim@fakeemail.com'),
  createData('Kim', 'kim@fakeemail.com'),
  createData('Kim', 'kim@fakeemail.com'),
  createData('Kim', 'kim@fakeemail.com'),
];

export default function ProspectsTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={"stuff"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}