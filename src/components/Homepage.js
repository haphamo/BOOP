import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Image from 'material-ui-image';
import '../index.css';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '70%',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    fontWeight: 'bold',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '8px'
  },
  input: {
    display: 'none',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  homepage: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    fontFamily: 'Lobster'
  },
  homepageButton: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1%'
  },
  registerLogin: {
    flexDirection: 'row'
  }
}));

export default function Homepage (props) {
  const classes = useStyles();
  // state for register
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [city, setCity] = useState('')
  const [post_code, setPost_Code] = useState('')
  const [profile_photo, setProfilePhoto] = useState('')
  // state for login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // conditional rendering
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [emailError, setEmailError] = useState(false)

  // for login
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

  // for register
  const onRegister = function(evt) {
    evt.preventDefault();
    userRegister()
  }

  const handleRegisterFirstName = function(e) {
    setRegisterFirstName(e.target.value)
  }
  const handleRegisterLastName = function(e) {
    setRegisterLastName(e.target.value)
  }

  const handleRegisterEmail = function(e) {
    setRegisterEmail(e.target.value)
  }
  const handleRegisterPassword = function(e) {
    setRegisterPassword(e.target.value)
  }

  const handleRegisterCity = function(e) {
    setCity(e.target.value)
  }
  const handleRegisterPostCode = function(e) {
    setPost_Code(e.target.value)
  }
  const handleRegisterProfilePhoto = e => {
    setProfilePhoto(e.target.value)
  }

  //make a call to the server if theres a session id (stretch)
  // useEffect(()=> {
  // }, [])

  // handles login
 let userLogin = function () {
   axios.post(`/login`, {email, password}, { withCredentials: true})
   .then(res => {
      props.onLogin(res.data.userId)
   })
 }
 // handles register
 const userRegister = function() {
   axios.post(`/register`, { registerFirstName, registerLastName, registerEmail, registerPassword, city, post_code, profile_photo }, { withCredentials: true})
   .then(res => {
     props.onLogin(res.data.userId)
     if(res.data.message) {
      setEmailError(true)
     }
   })
 }

  return (
  <div>
    { showRegister ?
      <div>
        <h2 className={classes.header}>Register</h2>
        <form className={ classes.formStyle } onSubmit={onRegister}>
        <TextField
          id="firstName"
          label="First Name"
          className={classes.textField}
          margin="normal"
          onChange={handleRegisterFirstName}
          value={registerFirstName}
        />
        <TextField
          id="lastName"
          label="Last Name"
          className={classes.textField}
          margin="normal"
          onChange={handleRegisterLastName}
          value={registerLastName}
        />
        {emailError && <small className="email-error">Email already exists!</small>}
         <TextField
          id="email"
          label="Email"
          className={classes.textField}
          margin="normal"
          onChange={handleRegisterEmail}
          value={registerEmail}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={registerPassword}
          onChange={handleRegisterPassword}
        />
        <TextField
          id="city"
          label="City"
          className={classes.textField}
          margin="normal"
          onChange={handleRegisterCity}
          value={city}
        />
        <TextField
          id="postal code"
          label="Postal Code"
          className={classes.textField}
          margin="normal"
          onChange={handleRegisterPostCode}
          value={post_code}
        />
        <TextField
          required
          id="profilephoto"
          label="Profile Photo Url"
          className={classes.textField}
          margin="normal"
          onChange={handleRegisterProfilePhoto}
          value={profile_photo}
        />
        <div className={classes.registerLogin}>
          <Button variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => setShowRegister(false)}>
            Cancel
          </Button>
          <Button variant="contained" className={classes.button} type="submit" >
            Create
          </Button>
        </div>
      </form>
      </div>
    :
    showLogin ? 
    <div className="header">
      <h2 className={classes.header}>Login</h2>
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
         <div className={classes.login}>
          <Button variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => setShowLogin(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" className={classes.button} type="submit" >
              Log In
          </Button>
        </div>
      </form>
        {/* <a href="http://localhost:3001/auth/facebook">Log In with Facebook</a> */}
        {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
    </div>
      : 
      <Container maxWidth="xl">
        <div className={classes.homepage}>
          <h1 className={classes.header}>Boop</h1>
        </div>
        <Image imageStyle={{height: 'auto'}}
          src="https://fsb.zobj.net/crop.php?r=CwI3Lth_X1tKRypKBXpdk_pFkIpLGncG2KqQrg5-rzZFtFDqYj68LS6L_XuIp0MRImIH1JJJXWBUxbaOYxHotbD9yBU7PDZxjzd37xuVKMihkyrmV0nRvCm83SAJGe5OIjspmOrviYBcwPMA"
        />
        <div className={classes.homepageButton}>
        <Button variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={() => setShowRegister(true)}>
          Register
        </Button>
        <Button variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={() => setShowLogin(true)}>
          Log In
        </Button>
        </div>
      </Container>
    }
  </div>
  );
}
