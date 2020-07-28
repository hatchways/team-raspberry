import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

export default function CustomTextField(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        className={classes.TextField}
        required
        name={props.name}
        label={props.label}
        type={props.type}
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        error={props.error}
        helperText={props.helperText}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  TextField: {
    width: "100%",
    "& label.Mui-focused": {
      color: theme.primary,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.primary,
      },
    },
  },
}));
