import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Navbar(props) {
    const classes = useStyles();

    const routeButton = useState(props.type === 'signup' ? 'Login' : 'Signup');
    const routeTo = useState(props.type === 'signup' ? '/login' : '/');

    return (
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
        flexGrow: 1
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