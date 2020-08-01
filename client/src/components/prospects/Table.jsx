import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Auth from "../../services/auth-services"


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

export default function ProspectsTable(props) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  function fetchProspects() {
    Auth.getProspects().then((res) => {
      setRows(res.data.prospects);
      setFilteredRows(res.data.prospects);
    });

  }

  function filterProspects(query) {
    if (query === '') {
      return rows;
    }
    let filtered = [];
    for(let i=0; i < rows.length; i++) {
      let inFirst = rows[i].firstName.toLowerCase().includes(query.toLowerCase());
      let inLast = rows[i].lastName.toLowerCase().includes(query.toLowerCase());
      let inEmail = rows[i].email.toLowerCase().includes(query.toLowerCase());
      if (inFirst || inLast || inEmail) {
        filtered.push(rows[i]);
      }
    }
    setFilteredRows(filtered);
  }

  // Gets called every time this component gets rendered (updated).
  useEffect(() => {
    filterProspects(props.text);
  }, [props.text]);

  useEffect(() => {
      fetchProspects();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={"stuff"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
