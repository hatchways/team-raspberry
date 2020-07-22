import React, { Component } from "react";
import { AppBar, Toolbar, Button, Typography, TextField, withStyles, Paper, Grid, } from "@material-ui/core";
import { Link } from "react-router-dom";

class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        passwordError: "",
        repeatPasswordError: "",
    };

    validate = () => {
        let valid = true;
        let errors = {
            passwordError: "",
            repeatPasswordError: "",
        };
        
        if (this.state.password.length < 6) {
            console.log('inside');
            errors.passwordError = "Required: Password length of 6";
            console.log(errors.passwordError);
            valid = false;
        }

        if (this.state.password !== this.state.repeatPassword) {
            errors.repeatPasswordError = "Required: Passwords must match";
            valid = false;
        }

        this.setState({
            ...this.state,
            ...errors,
        });

        return valid;
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const valid = this.validate();
        console.log(this.state.passwordError);
        console.log('Hello');
        if (valid) {
            this.props.history.push('/login');
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar elevation="1" position="static" style={{ background: '#ffffff' }}>
                    <Toolbar>
                        <Button>
                            MAILSENDER
                        </Button>
                        <Typography className={classes.title}>
                            Already have an account?
                        </Typography>
                        <Button className={classes.Button} component={Link} to="/login" variant="outlined">Login</Button>
                    </Toolbar>
                </AppBar>

                <Grid container className={classes.gridRoot} justify="center" alignItems="center">
                    <Grid item xs={4}>
                        <Paper className={classes.Paper}>
                            <Typography className={classes.FormTitle}>Signup</Typography>
                            <form action="/login" method="POST">
                                <Grid item container spacing={1} justify="center" alignItems='center'>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.TextFields}
                                            required
                                            name="firstName"
                                            label="First Name"
                                            variant="outlined"
                                            value={this.state.firstName}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.TextFields}
                                            required
                                            name="lastName"
                                            label="Last Name"
                                            variant="outlined"
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>

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
                                            error={this.state.passwordError.length === 0 ?  false : true}
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

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.TextFields}
                                            required
                                            error={this.state.repeatPasswordError.length === 0 ? false : true}
                                            name="repeatPassword"
                                            label="Repeat Password"
                                            type="password"
                                            variant="outlined"
                                            value={this.state.repeatPassword}
                                            helperText={this.state.repeatPasswordError}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item container>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={4}>
                                            <Button className={classes.SignupButton} type="submit">Create</Button>
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                    </Grid>

                                </Grid>
                            </form>
                        </Paper>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

const signupPageStyles = theme => ({
    root: {
        height: '100%'
    },
    gridRoot: {
        height: '100vh'
    },
    Button: {
        marginRight: theme.spacing(2),
        borderColor: '#3eb485',
    },
    title: {
        textAlign: 'center',
        color: 'black',
    },
    FormTitle: {
        textAlign: 'center',
        color: 'black',
        marginBottom: '3rem',
        marginTop: '-1rem'
    },
    SignupButton: {
        background: 'linear-gradient(90deg, #2DAA94 30%, #4CBC77 80%)',
        fontSize: '18px',
        height: '3rem',
        width: '100%',
        color: 'white',
        textTransform: 'capitalize',
        marginTop: '3rem'
    },
    Paper: {
        padding: '5rem',
        width: '100%',
    },
    TextFields: {
        width: '100%'
    }
});


export default withStyles(signupPageStyles)(Signup);