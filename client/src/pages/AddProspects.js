import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  Paper,
  Divider,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";

export default function AddProspects() {
  const classes = useStyles();
  const [csv, setCsv] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [headersIndex, setHeadersIndex] = useState({
    email: 0,
    status: 1,
    firstName: 2,
    lastName: 3,
  });

  const [snackbar, setSnackBar] = useState({
    snackbarMsg: "",
    snackbarOpen: false,
  });

  const snackbarClose = () => {
    setSnackBar({
      snackbarMsg: "",
      snackbarOpen: false,
    });
  };

  let formData = new FormData();

  const handleFiles = (e) => {
    if (window.FileReader) {
      setCsv(e.target.files[0]);
    } else {
      alert("FileReader are not supported in this browser");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.append("file", csv);
    fetch("/api/add/prospectsCsv", {
      method: "POST",
      body: formData,
    }).then((res) =>
      res.json().then((data) => {
        if (data.status === "success") {
          const dataHold = data.headers;
          dataHold.push("None");
          setCsvHeaders(dataHold);
        }

        setSnackBar({
          snackbarMsg: data.message,
          snackbarOpen: true,
        });
      })
    );
  };

  const handleChange = (e) => {
    const target = e.target;
    setHeadersIndex((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const importCsv = (e) => {
    e.preventDefault();
    console.log(csvHeaders.length);
    fetch("/api/import/prospects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...headersIndex, none: csvHeaders.length - 1 }),
    }).then((res) => {
      res.json().then((data) => {
        setSnackBar({
          snackbarMsg: data.message,
          snackbarOpen: true,
        });
      });
    });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <Paper className={classes.Paper}>
            <form
              action="/api/add/prospectsCsv"
              method="POST"
              onSubmit={onSubmit}
            >
              <Grid container justify="center" alignItems="center">
                <Grid item xs={3}>
                  <label htmlFor="input-button-file">
                    <Button
                      className={classes.fileButton}
                      variant="contained"
                      component="span"
                      color="default"
                    >
                      Choose File
                    </Button>
                  </label>
                  <input
                    id="input-button-file"
                    className={classes.fileInput}
                    type="file"
                    onChange={handleFiles}
                    name="file"
                    accept=".csv"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    className={classes.Typography}
                    defaultValue="File Name"
                  >
                    {csv.length === 0 ? "File Name" : csv.name}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    className={classes.fileButton}
                    variant="contained"
                    color="default"
                    type="submit"
                  >
                    <CloudUploadIcon className={classes.icons} />
                    Upload File
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {csvHeaders.length === 0 ? (
          ""
        ) : (
          <Grid item xs={10}>
            <Paper className={classes.Paper}>
              <Typography variant="h4">Columns</Typography>
              <Divider className={classes.Divider} variant="middle" />
              <form
                action="/api/import/prospects"
                method="POST"
                onSubmit={importCsv}
              >
                <Grid
                  spacing={2}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Select
                      className={classes.Select}
                      name="email"
                      value={headersIndex["email"]}
                      onChange={handleChange}
                      disabled={csvHeaders.length === 0 ? true : false}
                    >
                      {csvHeaders.map((value, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.SelectTypography}>
                      Please select your Email column (required)
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      className={classes.Select}
                      name="status"
                      value={headersIndex["status"]}
                      onChange={handleChange}
                      disabled={csvHeaders.length === 0 ? true : false}
                    >
                      {csvHeaders.map((value, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.SelectTypography}>
                      Please select your Status column (if applicable)
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      className={classes.Select}
                      name="firstName"
                      value={headersIndex["firstName"]}
                      onChange={handleChange}
                      disabled={csvHeaders.length === 0 ? true : false}
                    >
                      {csvHeaders.map((value, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.SelectTypography}>
                      Please select your First Name column (if applicable)
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      className={classes.Select}
                      name="lastName"
                      value={headersIndex["lastName"]}
                      onChange={handleChange}
                      disabled={csvHeaders.length === 0 ? true : false}
                    >
                      {csvHeaders.map((value, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.SelectTypography}>
                      Please select your Last Name column (if applicable)
                    </Typography>
                  </Grid>
                  <Button
                    className={classes.importButton}
                    variant="contained"
                    type="submit"
                  >
                    Import Prospects
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar.snackbarOpen}
        autoHideDuration={6000}
        onClose={snackbarClose}
        message={snackbar.snackbarMsg}
        action={
          <IconButton
            className={classes.snackBarButton}
            aria-label="close"
            onClick={snackbarClose}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        }
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fileInput: {
    flexGrow: 1,
    display: "none",
  },
  icons: {
    marginRight: theme.spacing(1),
  },
  fileButton: {
    width: "100%",
  },
  Typography: {
    width: "100%",
    textAlign: "center",
  },
  Select: {
    width: "100%",
  },
  SelectTypography: {
    marginLeft: theme.spacing(2),
  },
  TextField: {
    width: "100%",
  },
  Paper: {
    padding: "3rem",
    marginTop: theme.spacing(3),
  },
  snackBarButton: {
    color: "white",
  },
  Divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  importButton: {
    background: "linear-gradient(90deg, #2DAA94 30%, #4CBC77 80%)",
  },
}));
