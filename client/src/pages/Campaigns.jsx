import React, {useState} from 'react'
import CampaignsTable  from '../components/campaigns/CampaignsTable';
import {Container, Grid} from "@material-ui/core";
import SearchBar from "../components/prospects/SearchBar";
import {makeStyles} from "@material-ui/core/styles";


export default function Campaigns(props) {
  const classes = useStyles();

   const [text, setText] = useState();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.sidebar} sm={2}>
          <SearchBar setText={setText}/>
        </Grid>
        <Grid item sm={10}>
          <Container className={classes.contentContainer}>
            <Grid item className={classes.contentHeader} sm={12}>
            </Grid>
            <Grid item className={classes.content} sm={12}>
              <CampaignsTable text={text}/>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
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
  input: {}
}));