import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Auth from "../../services/auth-services"
import Checkbox from "./Checkbox";

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
      let pList = res.data.prospects;
      for (let i=0; i < pList.length; i++) {
        // Set the checkbox default value in the row state so it can be accessed easily by campaigns.
        pList[i]['checked'] = false;
      }
      setRows(pList);
      setFilteredRows(pList);
    });
  }

  function handleCheck(isChecked, id) {
    // 'rows' is read-only, so we need to copy everything and then change.
    // See https://stackoverflow.com/a/49502115
    for (let i=0; i < rows.length; i++) {
      if (rows[i]['id'] === id) {
        // 1. Make a shallow copy of the items
        let items = [...rows];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[i]};
        // 3. Replace the property you're intested in
        item.checked = isChecked;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[i] = item;
        // 5. Set the state to our new copy
        setRows(items);
      }
    }
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

  // //Helpful to debug rows state when it changes.
  // useEffect(() => {
  //     console.log(rows);
  // }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table className={"stuff"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell><Checkbox checked={row.checked}  clickEvent={(isChecked) => handleCheck(isChecked, row.id)}/></TableCell>
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