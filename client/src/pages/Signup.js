import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, TextField, Button, Snackbar } from '@material-ui/core';

export default function Signup() {
    const classes = useStyles();

    const form = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        repeatPassword: '',
        passwordError: '',
        repeatPasswordError: '',
        emailError: '',
    }

    const snackbarObj = {
        snackbarMsg: '',
        snackbarOpen: false,
    }

    const [formValues, setFormValues] = useState(form)
    const [snackbar, setSnackbar] = useState(snackbarObj)
    const { email, password, firstName, lastName, repeatPassword, passwordError, repeatPasswordError, emailError } = formValues

    const validate = () => {
        let valid = true
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let errors = {
            passwordError: '',
            repeatPasswordError: '',
            emailError: '',
        }

        if (password.length < 6) {
            errors.passwordError = 'Password must be atleast 6 characters'
            valid = false;
        }

        if (password !== repeatPassword) {
            errors.repeatPasswordError = 'Required: Passwords must match'
            valid = false;
        }

        if (!re.test(email)) {
            errors.emailError = 'Incorrect email format'
            valid = false;
        }

        setFormValues(prevState => ({
            ...prevState,
            ...errors
        }))

        return valid;
    }

    const onSubmit = e => {
        e.preventDefault();
        const valid = validate();

        if (valid) {
            console.log(formValues);
            fetch('/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formValues.email,
                    password: formValues.password,
                    firstName: formValues.firstName,
                    lastName: formValues.lastName
                })
            })
                .then(res => {
                    res.json().then(data => {
                        setSnackbar({
                            snackbarMsg: data.message,
                            snackbarOpen: true,
                        })

                        if (res.status >= 200 && res.status < 300) {
                            // TODO REDIRECTION
                        }
                    })
                })
        }
    }

    const handleChange = e => {
        const target = e.target

        setFormValues(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const snackbarClose = () => {
        setSnackbar({
            snackbarMsg: '',
            snackbarOpen: false,
        })
    }

    return (
        <div className={classes.root}>
            <Navbar type="signup">Already have an account?</Navbar>
            <Grid container spacing={0} className={classes.gridRoot} justify='center' alignItems='center'>
                <Grid item xs={10} sm={7} md={6} lg={4}>
                    <Paper className={classes.Paper}>
                        <Typography variant="h5" className={classes.FormTitle}>Signup</Typography>
                        <form action="/signup" method="POST" onSubmit={onSubmit}>
                            <Grid item container spacing={2} justify="center" alignItems='center'>
                                <Grid item xs={10}>
                                    <TextField
                                        className={classes.TextFields}
                                        required
                                        name="firstName"
                                        label="First Name"
                                        type="text"
                                        variant="outlined"
                                        value={firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        className={classes.TextFields}
                                        required
                                        name="lastName"
                                        label="Last Name"
                                        type="text"
                                        variant="outlined"
                                        value={lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        className={classes.TextFields}
                                        required
                                        error={emailError.length === 0 ? false : true}
                                        name="email"
                                        label="Your Email"
                                        type="email"
                                        variant="outlined"
                                        value={email}
                                        helperText={emailError}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        className={classes.TextFields}
                                        required
                                        error={passwordError.length === 0 ? false : true}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        helperText={passwordError}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        className={classes.TextFields}
                                        required
                                        error={repeatPasswordError.length === 0 ? false : true}
                                        name="repeatPassword"
                                        label="Repeat Password"
                                        type="password"
                                        variant="outlined"
                                        value={repeatPassword}
                                        helperText={repeatPasswordError}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button className={classes.SignupButton} type="submit">Create</Button>
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
                open={snackbar.snackbarOpen}
                autoHideDuration={6000}
                onClose={snackbarClose}
                message={snackbar.snackbarMsg}
                action={
                    <Button
                        color="inherit"
                        size="small"
                        onClick={snackbarClose}
                        variant="outlined"
                    >
                        X
                    </Button>
                }
            />
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    gridRoot: {
        // 64px is default height of app bar
        height: 'calc(100vh - 64px)',
        background: '#F4F6FC'
    },
    AppBar: {
        background: '#ffffff'
    },
    Button: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        borderColor: '#3eb485'
    },
    title: {
        flexGrow: 1,
        color: theme.primary,
    },
    question: {
        flexGrow: 1,
        textAlign: 'right',
        color: theme.primary
    },
    FormTitle: {
        textAlign: 'center',
        color: '#000000',
        marginBottom: '3rem',
        marginTop: '-1rem',
    },
    Paper: {
        padding: '4rem',
    },
    TextFields: {
        width: '100%',
        '& label.Mui-focused': {
            color: theme.primary,
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.primary,
            },
        },
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
}));