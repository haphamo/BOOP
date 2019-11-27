import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '70%',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
// Add onClick to post login route to check cookie and set!!
export default function Login () {
  const classes = useStyles();

  return (
    <div className="header">
      <h2>Login</h2>
      <hr></hr>
      <form style={ formStyle }>
        <a href="http://localhost:3001/auth/facebook">Log In with Facebook</a>
         {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
         
         <TextField
          id="email"
          label="Email"
          defaultValue="Email"
          className={classes.textField}
          margin="normal"
        />
         <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
      <Button variant="contained" color="primary" className={classes.button} >
        Log In !
      </Button>
        </form>
    </div>
  );
}