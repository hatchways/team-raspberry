import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import * as Auth from "../services/auth-services";


// TODO: Fix Styling.

export default function LoggedInNavbar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  const routeButton = useState(props.type === 'signup' ? 'Login' : 'Signup');
  const routeTo = useState(props.type === 'signup' ? '/login' : '/');
  const username = "John Doe"


  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    handleClose()
    props.setUser(null)
    Auth.logout()
    setLoggedIn(false)
  }

  return (
    loggedIn ? 
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.AppBar}>
          <Button component={Link} to={'/'}>
            <Typography variant="body1" className={classes.titleFirst}>
              mail
            </Typography>
            <Typography variant="body1" className={classes.titleSecond}>
              sender
            </Typography>
          </Button>

          <Button className={classes.button}
            component={Link} to='/campaigns'>
            Campaigns
          </Button>
          <Button className={classes.button}
            component={Link} to='/prospects'>
            Prospects
          </Button>
          <Button className={classes.button}
            component={Link} to='/templates'>
            Templates
          </Button>
          <Button className={classes.button}
            component={Link} to='/reporting'>
            Reporting
          </Button>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar alt="John Doe" src="/demo_avatar.png" /> {username}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}
              component={Link} to='/profile'>
                Profile
              </MenuItem>
            <MenuItem onClick={handleLogout}
              component={Link} to='/'>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div> :
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.AppBar}>
          <Button component={Link} to={'/'}>
            <Typography variant="h6" className={classes.titleFirst}>
              Mail
                      </Typography>
            <Typography variant="h6" className={classes.titleSecond}>
              Sender
                      </Typography>
          </Button>

          <Typography variant="caption" className={classes.question}>
            {props.children}
          </Typography>
          <Button
            className={classes.Button}
            variant="outlined"
            component={Link} to={routeTo[0]}
          >
            {routeButton[0]}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    background: '#ffffff',
  },
  Button: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderColor: '#3eb485'
  },
  titleFirst: {
    color: 'black',
    textTransform: 'uppercase',
  },
  titleSecond: {
    color: theme.primary,
    textTransform: 'uppercase',
  },
  question: {
    flexGrow: 1,
    textAlign: 'right',
    color: 'black'
  }
}));