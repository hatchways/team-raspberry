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

function createData(id, name, email) {
  return { id, name, email };
}

// const rows = [
// //   createData('1','Kim', 'kim@fakeemail.com'),
// //   createData('2','Kim', 'kim@fakeemail.com'),
// //   createData('3','Kim', 'kim@fakeemail.com'),
// //   createData('4','Kim', 'kim@fakeemail.com'),
// //   createData('5','Kim', 'kim@fakeemail.com')
// // ];

export default function ProspectsTable() {
  const classes = useStyles();

  const [rows, setRows] = useState([
    createData('1','Kim', 'kim@fakeemail.com')
  ]);

  function fetchProspects() {
    fetch("/api/prospects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // TODO: This should be pulled from the local storage? or at least passed in.
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYxNTQ0NDYsImlhdCI6MTU5NjE1MDg0Niwic3ViIjoxfQ.lZpkVZluz2ZLr6eljlwUabt-_b5N4p5C7rjexd30RKo"
      }
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setRows(data.prospects);
      });
    });
  }

  return (
    <TableContainer component={Paper}>
      <button onClick={fetchProspects}>
        Click me!
      </button>
      <Table className={"stuff"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
