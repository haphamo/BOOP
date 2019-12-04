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
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostCode] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const onSubmit = function (evt) {
    evt.preventDefault();
    //validations here
    userLogin();
  }
  const handleNameChange = function(e) {
    setName(e.target.value)
  }
  const handleEmailChange = function(e) {
    setEmail(e.target.value)
  }
  const handlePasswordChange = function(e) {
    setPassword(e.target.value)
  }
  const handleCityChange = function(e) {
    setCity(e.target.value)
  }
  const handlePostCodeChange = function(e) {
    setPostCode(e.target.value)
  }
  const handleProfilePhotoChange = e => {
    setProfilePhoto(e.target.value)
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
    { showRegister ?
      <div>
        <h2 className={classes.header}>Register</h2>
        <form className={ classes.formStyle } onSubmit={onSubmit}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          margin="normal"
          onChange={handleNameChange}
          value={name}
        />
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
        <TextField
          id="city"
          label="City"
          className={classes.textField}
          margin="normal"
          onChange={handleCityChange}
          value={city}
        />
        <TextField
          id="postal code"
          label="Postal Code"
          className={classes.textField}
          margin="normal"
          onChange={handlePostCodeChange}
          value={postcode}
        />
        <TextField
          required
          id="profilephoto"
          label="Profile Photo Url"
          className={classes.textField}
          margin="normal"
          onChange={handleProfilePhotoChange}
          value={profilePhoto}
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

// https://images.unsplash.com/photo-1521247560470-d2cbfe2f7b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
// https://fsb.zobj.net/crop.php?r=qyT8w54_TtfLDRrdZvyRJKn7GxNRDlHoEB4XrBfFhQb8Zunb6mlmBc10IU6B-3HL6xYSXydqDz_M_UpugDlwthiXBA0X9t2ZkJUHAqNMKb8TYQWTqm5yViiTPkTysLj5XR4dn0WgGE03vcaS
// https://fsb.zobj.net/crop.php?r=990ng_gqpTI2FynuMOGgy_e3cGl6Uk3ucAFVZwIVx_9EZaTXmR-hkfN-8Wd9RdBvzEdH6IxxILYN2c1AA9UN6CqRPN1FbnzwswgRleIE_59QwOOrvmZh3Bm15jlFWWnW8TVQC-oT6jg1i61w
// https://fsb.zobj.net/crop.php?r=e_KQoNmLTXTOJoQnsrzfD7Z9PRTb-Of-UMSd_ZJff5TrTkcCFLqqtYjE4pKYUhDTpO6RGvpGWG6qgOUs81ob_8SWO-XxA6lrXTA8gu-J6kaHrsdmm5MklDrekOeRFJeU_DlqXk9QW6RWv2Zc
// https://fsb.zobj.net/crop.php?r=CwI3Lth_X1tKRypKBXpdk_pFkIpLGncG2KqQrg5-rzZFtFDqYj68LS6L_XuIp0MRImIH1JJJXWBUxbaOYxHotbD9yBU7PDZxjzd37xuVKMihkyrmV0nRvCm83SAJGe5OIjspmOrviYBcwPMA
