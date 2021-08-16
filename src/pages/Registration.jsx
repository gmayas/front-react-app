import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
//import Grid from '@material-ui/core/Grid';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration() {
  const classes = useStyles();

  let history = useHistory();
  const { setAuthState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [msgUser, setMsgUser] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  const [errorUser, setErrorUser] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [validate, setValidate] = useState(false);

  const handleChangeUser = (event) => {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(event.target.value)) {
      setUsername(event.target.value);
      setErrorUser(false);
      setMsgUser("La dirección de email " + event.target.value + " es correcta!.");
    } else {
      setErrorUser(true);
      setMsgUser("La dirección de email es incorrecta!.");
    }
  };

  const handleChangePassword = (event) => {
    if (event.target.value.length >= 6) {
      setPassword(event.target.value);
      setErrorPassword(false);
      setMsgPassword("Passsword valido, mayor o igual a 6 caracteres!.");
    } else {
      setErrorPassword(true);
      setMsgPassword("Passsword invalido, menor a 6 caracteres!.");
    }
  };

  const submit = () => {
    console.log('!errorUser && !errorPassword', (!errorUser && !errorPassword))
    if ((!errorUser && !errorPassword) && (username.length > 0 && password.length > 0)) {
      const data = { username, password };
      console.log(data)
      setValidate(false);
      axios.post("http://localhost:4005/auth", data).then(() => {
        console.log(data);
      });
      //history.push("/");
    } else {
      setValidate(true);
      console.log('Error en su captura')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LibraryBooksIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Container className={classes.root} >
          <FormControl variant="outlined" fullWidth>
            <TextField
              type="email"
              onChange={handleChangeUser}
              error={errorUser}
              id="outlined-helper-email"
              label="Email"
              helperText={msgUser}
              variant="outlined"
              autoComplete="email"
              autoFocus
              required
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <TextField
              type="password"
              onChange={handleChangePassword}
              error={errorPassword}
              id="outlined-helper-password"
              label="Password"
              helperText={msgPassword}
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}>
              Register
            </Button>
          </FormControl>
          <FormControl fullWidth>
            {validate ? (
              <>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Hola, <strong>Error en tu captura.</strong>
                </Alert>
              </>
            ) : (
              <>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Hola, <strong>Todos los campos son requeridos.</strong>
                </Alert>
              </>
            )}
          </FormControl>
        </Container>
      </div>
    </Container>
  );
}