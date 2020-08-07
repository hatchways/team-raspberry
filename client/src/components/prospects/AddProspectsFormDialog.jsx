import React, {useState, useEffect, useContext} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from "@material-ui/core/Select";
import {TableCell, TableRow} from "@material-ui/core";
import {CampaignContext} from "../../contexts/CampaignContext";
import * as Auth from "../../services/auth-services";


export default function AddProspectsFormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [campaignId, setCampaignId] = React.useState("");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    Auth.getCampaigns().then((res) => {
      setCampaigns(res.data.campaigns);
    });
  }, []);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleFormChange = (e) => {
    setCampaignId(e.target.value);
    setOpen(true);
  };

  const handleClose = () => {
    props.onSubmit(campaignId);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add to Campaign
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add to Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Choose Campaign:
          </DialogContentText>
          <CampaignContext.Provider value={{campaigns}}>
            <Select
              native
              value={campaignId}
              onChange={handleFormChange}
              >
              <option aria-label="Select" value="" />
              {campaigns.map((row) =>
                <option key={row.id} value={row.id}>{row.title}</option>
              )}
          </Select>
          </CampaignContext.Provider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}