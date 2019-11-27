import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
// login function

export default function Login () {
  const classes = useStyles();
  
  const [email, setEmail] = useState('')
  const onSubmit = function (evt) {
    evt.preventDefault();
    //validations here
    //prevent default
    console.log(email)
  }
  const handleChange = function(e) {
    setEmail(e.target.value)
  }

  return (
    <div className="header">
      <h2>Login</h2>
      <hr></hr>
      <form style={ formStyle } onSubmit={onSubmit}>
        <a href="http://localhost:3001/auth/facebook">Log In with Facebook</a>
         {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
         
         <TextField
          id="email"
          label="Email"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
          value={email}
        />
         <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
      <Button variant="contained" color="primary" className={classes.button} type="submit" >
        Log In !
      </Button>
        </form>
    </div>
  );
}