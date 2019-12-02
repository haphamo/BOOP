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
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function Homepage (props) {
  const classes = useStyles();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(false)

  const onSubmit = function (evt) {
    evt.preventDefault();
    //validations here
    userLogin();
  }
  const handleEmailChange = function(e) {
    setEmail(e.target.value)
  }
  const handlePasswordChange = function(e) {
    setPassword(e.target.value)
  }

  //make a call to the server if theres a session id (stretch)
  // useEffect(()=> {
  // }, [])

 let userLogin = function () {
   axios.post(`/login`, {email, password}, { withCredentials: true})
   .then(res => {
      props.onLogin(res.data.userId)
   })
 }

  return (
    <div>
      {showLogin ? 
      <div className="header">
        <h2>Login</h2>
        <form className={ classes.formStyle } onSubmit={onSubmit}>
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            margin="normal"
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" 
            color="primary" 
            className={classes.button} type="submit" >
              Log In
          </Button>
        </form>
          {/* <a href="http://localhost:3001/auth/facebook">Log In with Facebook</a> */}
          {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
      </div>
        
        : 
      <div>
      <h1>Homepage</h1>
      <Button onClick={()=> setShowLogin(true)}variant="contained" color="secondary">
        Log In
      </Button>
      </div>
      }
    </div>
  );
}