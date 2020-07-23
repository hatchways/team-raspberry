import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';

function Signup() {
    const classes = useStyles();

    const form = {
        email: '',
        password: '',
        repeatPassword: '',
        passwordError: '',
        repeatPasswordError: '',
    }

    const [formValues, setFormValues] = useState(form)
    const { email, password, repeatPassword, passwordError, repeatPasswordError } = formValues

    const validate = () => {
        let valid = true
        let errors = {
            passwordError: '',
            repeatPasswordError: ''
        }

        if (password.length < 6) {
            errors.passwordError = 'Password must be atleast 6 characters'
            valid = false;
        }

        if (password !== repeatPassword) {
            errors.repeatPasswordError = "Required: Passwords must match";
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
        console.log(formValues);

        if (valid) {
            this.props.history.push('/login');
        }
    }

    const handleChange = e => {
        const target = e.target

        setFormValues(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return (
        <div className={classes.root}>
            <Navbar type="signup">Already have an account?</Navbar>
            <Grid container spacing={0} className={classes.gridRoot} justify='center' alignItems='center'>
                <Grid item xs={10} sm={7} md={6} lg={4}>
                    <Paper className={classes.Paper}>
                        <Typography className={classes.FormTitle}>Signup</Typography>
                        <form action="/signup" method="POST" onSubmit={onSubmit}>
                            <Grid item container spacing={2} justify="center" alignItems='center'>

                                <Grid item xs={10}>
                                    <TextField
                                        className={classes.TextFields}
                                        required
                                        name="email"
                                        label="Your Email"
                                        type="email"
                                        variant="outlined"
                                        value={email}
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
        marginTop: '-1rem'
    },
    Paper: {
        padding: '4rem',
    },
    TextFields: {
        width: '100%',
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

export default Signup;