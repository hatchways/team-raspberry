import React, { Component } from "react";
import { Typography, AppBar, Toolbar, Button, Paper, TextField, withStyles, Snackbar, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const loginPageStyles = theme => ({
    text: {
        color: 'black',
        flexGrow: 1
    },
    gridRoot: {
        height: '100vh'
    },
    Button: {
        marginRight: theme.spacing(2),
        borderColor: '#3eb485',
    },
    LoginButton: {
        background: 'linear-gradient(90deg, #2DAA94 30%, #4CBC77 80%)',
        fontSize: '18px',
        height: '3rem',
        width: '100%',
        color: 'white',
        textTransform: 'capitalize',
        marginTop: '3rem'
    },
    FormTitle: {
        textAlign: 'center',
        color: 'black',
        marginBottom: '3rem',
        marginTop: '-1rem'
    },
    Paper: {
        padding: '5rem',
        width: '100%',
    },
    TextFields: {
        width: '100%'
    }
});

class Login extends Component {
    state = {
        email: '',
        password: '',
        snackbarMsg: '',
        snackbarOpen: false,
    }

    snackbarClose = e => {
        this.setState({ snackbarOpen: false });
    }

    validate = () => {
        return true;
    }

    onSubmit = e => {
        const valid = this.validate();

        if (valid) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({ 
                    email: this.state.email,
                    password: this.state.email,
                })
            };

            fetch('/login', requestOptions)
                .then(response => response.text())
                //.then(response => response.json())
                .then(data => console.log(data));

            this.setState({snackbarMsg: 'Welcome!', snackbarOpen: true});
        } else {
            this.setState({snackbarMsg: 'Incorrect Email or Password', snackbarOpen: true});
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="Login">
                <AppBar elevation={1} position="static" style={{ background: '#ffffff' }}>
                    <Toolbar>
                        <Button>
                            MAILSENDER
                        </Button>
                        <Typography className={classes.text}>
                            Don't have an account?
                        </Typography>
                        <Button className={classes.Button} component={Link} to="/" variant="outlined">Create</Button>
                    </Toolbar>
                </AppBar>
                <Grid container className={classes.gridRoot} justify="center" alignItems="center">
                    <Grid item xs={4}>
                        <Paper className={classes.Paper}>
                            <Typography className={classes.FormTitle}>Login</Typography>
                            <form action="/login" method="POST" onSubmit={this.onSubmit}>
                                <Grid item container spacing={1} justify="center" alignItems='center'>
                        

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.TextFields}
                                            required
                                            name="email"
                                            label="Your Email"
                                            type="email"
                                            variant="outlined"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.TextFields}
                                            required
                                            name="password"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            color="#75C9A8"
                                            value={this.state.password}
                                            helperText={this.state.passwordError}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>


                                    <Grid item container>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={4}>
                                            <Button className={classes.LoginButton} type="submit">Login</Button>
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                    </Grid>

                                </Grid>
                            </form>
                        </Paper>

                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.snackbarClose}
                    message={this.state.snackbarMsg}
                >
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(loginPageStyles)(Login);

