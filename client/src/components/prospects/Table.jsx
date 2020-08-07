import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Auth from "../../services/auth-services"
import Checkbox from "./Checkbox";
import AddProspectsFormDialog from "./AddProspectsFormDialog";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, Button
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
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  function assignProspectsToCampaign(campaignId, prospectIds) {
    console.log("assign to campaign", campaignId, prospectIds);
  }

  function fetchProspects() {
    Auth.getProspects().then((res) => {
      let pList = res.data.prospects;
      pList.map(p => {p['checked'] = false});

      setRows(pList);
      setFilteredRows(pList);
    });
  }

  function handleCheck(isChecked, id) {
    let disabled = buttonDisabled;
    // 'rows' is read-only, so we need to copy everything and then change.
    // See https://stackoverflow.com/a/49502115
    for (let i=0; i < rows.length; i++) {
      if (rows[i]['id'] === id) {
        // 1. Make a shallow copy of the items
        let items = [...rows];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[i]};
        // 3. Replace the property you're interested in
        item.checked = isChecked;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[i] = item;
        // 5. Set the state to our new copy
        setRows(items);
        if (isChecked) {
          disabled = false;
          setButtonDisabled(disabled);
        }
        else {
          disabled = true;
          setButtonDisabled(disabled);
        }
      }
    }
    // console.log(disabled);
    // setButtonDisabled(disabled)
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

  // //Helpful to debug rows state when it changes - will delete later.
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
      <AddProspectsFormDialog onSubmit = {campaign_id => assignProspectsToCampaign(campaign_id, rows.filter(p => p.checked))} />
    </TableContainer>
  );
}