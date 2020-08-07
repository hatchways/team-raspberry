import React, { useEffect, useState } from "react";
import CampaignsTable from "../components/campaigns/CampaignsTable";
import { Container, Grid } from "@material-ui/core";
import SearchBar from "../components/prospects/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import * as Auth from "../services/auth-services";
import { CampaignContext } from "../contexts/CampaignContext";

export default function Campaigns(props) {
  const classes = useStyles();

  const [text, setText] = useState();

  const [campaigns, setCampaigns] = useState([]);

  function fetchCampaigns() {
    Auth.getCampaigns().then((res) => {
      setCampaigns(res.data.campaigns);
    });
  }

  function createCampaign(title) {
    Auth.createCampaign(title).then((resp) => {
      // Make a copy of our list of campaigns and add newest one to the end.
      let items = [...campaigns];
      items.push(resp.data.campaign);
      setCampaigns(items);
    });
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className={classes.root}>
      <CampaignContext.Provider value={{ campaigns, setCampaigns }}>
        <Grid container spacing={3}>
          <Grid item className={classes.sidebar} sm={2}>
            <SearchBar setText={setText} />
          </Grid>
          <Grid item sm={10}>
            <Container className={classes.contentContainer}>
              <Grid item className={classes.contentHeader} sm={12}></Grid>
              <Grid item className={classes.content} sm={12}>
                <CampaignsTable text={text} onSubmitNew={createCampaign} />
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </CampaignContext.Provider>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    // 64px is default height of app bar
    height: "calc(100vh - 64px)",
    background: "#F4F6FC",
  },
  sidebar: {},
  content: {},
  contentContainer: {},
  contentHeader: {},
  input: {},
}));
